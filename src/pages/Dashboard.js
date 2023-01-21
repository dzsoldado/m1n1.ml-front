import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../Auth';

import Table from '../components/Table'

export default function Dashboard() {

  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.currentUser??Navigate('/signin')
  }, [])

  return (
    <Table />
  )
}
