import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getClicks } from '../FirebaseDB';
import { Container } from '@mui/system';
import { Box, CircularProgress, Typography } from '@mui/material/';
import NotFound from '../pages/NotFound';
import PieChartCustomized from '../components/dashboard/PieChartCustomized';
import LineChartCustomized from '../components/dashboard/LineChartCustomized';


function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

// Days of a month
function getClicksPerDay(clicks, tyear, tmonth){

  let clicksPerDay = []
  
  for (let i = 1; i<=daysInMonth(tyear, tmonth); i++){
    clicksPerDay.push({
      name: `${i}/${tmonth+1}`,
      value: 0
    })
  }
  clicks.forEach((click)=>{
    let date = new Date(click.date)
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDay()
    
    if(year === tyear){
      let index = clicksPerDay.findIndex(cpd=>{return cpd.name === `${day}/${month}`})
      if(index !== -1){ clicksPerDay[index].value ++ }
    }
  })
  return clicksPerDay;
}


function getCountries(clicks){
    let data = {}
    clicks.forEach(click=>{
      data[click.country] ? data[click.country] +=1 : data[click.country] =1
    })
    return Object.keys(data).map(key=>{return {name: key, value: data[key]}})
}

function getOperatingSystems(clicks){
  let OSs = {}
  clicks.forEach(click=>{
    OSs[click.os.name] ? OSs[click.os.name] +=1 : OSs[click.os.name] =1
  })
  return Object.keys(OSs).map(key=>{return {name: key, value: OSs[key]}})
}

function getBrowsers(clicks){
  let browsers = {}
  clicks.forEach(click=>{
    browsers[click.browser] ? browsers[click.browser] +=1 : browsers[click.browser] =1
  })
  return Object.keys(browsers).map(key=>{return {name: key, value: browsers[key]}})
}





export default function Details(){
  const { linkId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isFound, setFound] = useState(true);
  const [clicks, setclicks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [oss, setOss] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [chartClicks, setChartClicks] = useState([]);
  const [month, setMonth] = useState()
  const [year, setYear] = useState()


  async function loadData(linkId){
    setLoading(true)
    
    setMonth(new Date().getMonth())
    setYear(new Date().getFullYear())

    const data = await getClicks(linkId);
    if(data === null){
      setFound(false)
      return ;
    }
    setclicks(data)
    setCountries(getCountries(data))
    setOss(getOperatingSystems(data))
    setBrowsers(getBrowsers(data))

    setChartClicks(getClicksPerDay(data, new Date().getFullYear(), new Date().getMonth()))
    setLoading(false)
  }
  useEffect(()=>{
 
    loadData(linkId)
    
  }, []) 

  function incrementMonth(){
    let tempYear=year;
    let tempMonth=month;
    if (month===11) {
      setMonth(0); tempMonth = 0;
      setYear(year=>year+1); tempYear++;
    }
    else { 
      setMonth(month=>month+1); tempMonth++;
    }
    setChartClicks(getClicksPerDay(clicks, tempYear, tempMonth))
  }

  function decrementMonth(){
    let tempYear=year;
    let tempMonth=month;
    if (month===0) {
      setMonth(11); tempMonth = 11;
      setYear(year=>year-1); tempYear--;
    }
    else { 
      setMonth(month=>month-1); tempMonth--;
    }
    setChartClicks(getClicksPerDay(clicks, tempYear, tempMonth))

  }


  return (
    <>
    {
      isFound ?
      (
        <>
          <Container maxWidth="lg">
            <Box sx={{ margin : '2rem 0'}}>
    
              {!isLoading && 
                <>
                  
                  <Box sx={{ width: 'auto', margin : '2rem auto'}}>
                    <LineChartCustomized 
                      data={chartClicks} 
                      title='Clicks per day' 
                      incrementMonth={incrementMonth} 
                      decrementMonth={decrementMonth} 
                      month={month}
                      year={year}
                    />
                  </Box>


                  <Typography textAlign="center" component="h2" variant="h4" >Overals</Typography>
                  <Box sx={{ width: 'auto', margin : '2rem auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                    <PieChartCustomized data={countries} title='Countries'/>
                    <PieChartCustomized data={oss} title='Operating Systems'/>
                    <PieChartCustomized data={browsers} title='Browsers'/>
                  </Box>

                </>
              }
      
              {isLoading && <CircularProgress color="inherit" style={{margin: 'auto'}}/>}
    
            </Box>
    
    
          </Container>
        </>
      )
      : <NotFound />
    }
    </>
  );
  
}


