import * as React from 'react'

import { getServiceUrls } from '../modules/Ndt/utils'

const SpeedTest: React.FC = () => {
  return (
    <div>
      <div>speed test</div>
      <button onClick={
        async () => { console.log(await getServiceUrls()) }
      }>Connect</button>
    </div>
  )
}

export default SpeedTest
