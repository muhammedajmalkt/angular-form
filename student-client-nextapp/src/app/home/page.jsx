import Navbar from '@/components/Navbar'
import StudentTable from '@/components/StudentTable'
import React from 'react'

const Homepage = () => {
  return (
    <>
      <Navbar />
      <main className="p-6 ">
        <StudentTable />

      </main>  
      </>
  )
}

export default Homepage