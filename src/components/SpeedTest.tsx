import * as React from 'react'

import { getServiceUrls } from '../modules/Ndt/utils'
import { startTest } from '../modules/Ndt/tests'
import { serviceUrlPair } from '../modules/Ndt/types'

export interface Props {
  serviceUrls?: serviceUrlPair
}

const SpeedTest: React.FC<Props> = props => {
  let [serviceUrls, setServiceUrls] = React.useState(props.serviceUrls)

  const fetchUrls = async () => {
    setServiceUrls(await getServiceUrls())
  }

  React.useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <div>
      <div>speed test</div>
      {serviceUrls && (
        <button
          onClick={() => {
            if (serviceUrls !== undefined) {
              startTest(serviceUrls)
            }
          }}
        >
          Connect
        </button>
      )}
    </div >
  )
}

export default SpeedTest
