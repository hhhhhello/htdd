import { timeUtils } from 'date'
import { FC, memo, useEffect } from 'react'

const Demo1: FC = () => {
  useEffect(() => {
    const res = timeUtils(1691488491764)
    console.log(res)
  }, [])

  return <div>hhddd3d</div>
}

export default memo(Demo1)
