"use client"

import { Store } from '@/app/context/DataStore'
import { Box, Grid, useMediaQuery } from '@mui/material'
import React from 'react'

export default function GridHome() {
  const {mobilDiv}=Store()
  const smallSize = useMediaQuery('(max-width:900px)')
  return (
    <Box >
      <Grid container >
        <Grid item sm={6} md={3} xs={12}>
        <img src={'https://i.pinimg.com/564x/ac/92/6e/ac926e37c89261ab012078ceda33e99f.jpg'} 
       alt="du"  width={'100%'} height={500}/>

        </Grid>
        <Grid item  sm={6} md={3} sx={{display :mobilDiv &&'none' }}>
        <img src={'https://i.pinimg.com/736x/89/87/02/89870267a9e35412d3142430abfda137.jpg'} 
       alt="du" width={'100%'} height={500}/>

        </Grid>
        <Grid item md={3}  sx={{display :smallSize &&'none' }}>
        <img src={'https://i.pinimg.com/564x/28/1b/ed/281bed2f934e7054f9252194981c0b94.jpg'} 
       alt="du" width={'100%'} height={500}/>

        </Grid>
        <Grid item md={3}  sx={{display :smallSize &&'none' }}>
        <img src={'https://i.pinimg.com/474x/17/f8/0a/17f80a8550840d72e04888cd1cce8496.jpg'} 
       alt="du" width={'100%'} height={500}/>

        </Grid>
      </Grid>
      {/* <HomeSwiper/> */}
    </Box>
  )
}
