import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getClicks } from '../FirebaseDB';
import { Container } from '@mui/system';
import { CircularProgress } from '@mui/material/';
import PieChartCustomized from '../components/dashboard/PieChart';

function getCountries(clicks){
    let data = {}
    clicks.map(click=>{
      data[click.country] ? data[click.country] +=1 : data[click.country] =1
    })
    return Object.keys(data).map(key=>{return {name: key, value: data[key]}})
}

function getOperatingSystems(clicks){
  let OSs = {}
  clicks.map(click=>{
    OSs[click.os.name] ? OSs[click.os.name] +=1 : OSs[click.os.name] =1
  })
  return Object.keys(OSs).map(key=>{return {name: key, value: OSs[key]}})
}
function getBrowsers(clicks){
  let browsers = {}
  clicks.map(click=>{
    browsers[click.browser] ? browsers[click.browser] +=1 : browsers[click.browser] =1
  })
  return Object.keys(browsers).map(key=>{return {name: key, value: browsers[key]}})
}

export default function Details(){
  const { linkId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [clicks, setClicks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [oss, setOss] = useState([]);
  const [browsers, setBrowsers] = useState([]);



  async function loadData(linkId){
    setIsLoading(true)
    const data = await getClicks(linkId);
    const countries = await getCountries(data)
    setClicks(data);
    setCountries(countries)
    setOss(getOperatingSystems(data))
    setBrowsers(getBrowsers(data))
    setIsLoading(false)
  }
  useEffect(()=>{
 
    loadData(linkId)
    
  }, []) 

  // WE ADDED THE PIE CHARTS, NEXT STEPS IS TO ADD THE CHART FOR THE CLICKS COUNT OVER TIME AND DO SOME STYLING

  return (
    <>
    <h1>TEST</h1>
      <Container maxWidth="lg">
        <div style={{display: 'flex', flexWrap: 'wrap', margin: 'auto'}}>

          {!isLoading && 
            <>
              <PieChartCustomized data={countries} title='Countries'/>
              <PieChartCustomized data={oss} title='Operating Systems'/>
              <PieChartCustomized data={browsers} title='Browsers'/>
            </>
          }
   
          {isLoading && <CircularProgress color="inherit" />}


        </div>

      </Container>
    </>
  );
  
}


