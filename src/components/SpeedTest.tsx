import * as React from 'react'

import { getServiceUrls } from '../modules/Ndt/utils'
import { serviceUrlPair } from '../modules/Ndt/types'

import Client from '../modules/Ndt7'
import handlers from '../modules/Ndt7/callbacks'

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

  const startTest = () => {
    if (serviceUrls !== undefined) {
      const client = new Client(serviceUrls, handlers)
      client.startDownload()
    }
  }

  return (
    <div>
      <div>speed test</div>
      {serviceUrls && (
        <button
          onClick={startTest}
        >
          Connect
        </button>
      )}
    </div >
  )
}

export default SpeedTest
