import React from 'react'
import TableItems from '../../../../../../components/table/TableItems'

export default function Song() {
  const column = [
    {
      title: "STT",
      key: ()
    }
  ]
  return (
    <>
        <div>
          <div>
            <TableItems />
          </div>
        </div>
    </>
  )
}
