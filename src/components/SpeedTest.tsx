import * as React from 'react'

import { getServiceUrls } from '../modules/Ndt/utils'
import { serviceUrlPair } from '../modules/Ndt/types'

const SpeedTest: React.FC = () => {
  let mLabServiceUrls: serviceUrlPair
  const fetchUrls = async () => {
    mLabServiceUrls = await getServiceUrls()
  }

  React.useEffect(() => {
    fetchUrls()
  })

  return (
    <div>
      <div>speed test</div>
      <button
        onClick={() => {
          fetchUrls()
          console.log(mLabServiceUrls)
        }}
      >
        Connect
      </button>
    </div >
  )
}

export default SpeedTest
