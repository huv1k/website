import { Box, Tooltip } from '@chakra-ui/react'
import getStroke from 'perfect-freehand'
import { PointerEvent, useState } from 'react'
import { Edit2, MousePointer } from 'react-feather'
import { getSvgPathFromStroke } from '../lib/stroke'

export const Canvas = () => {
  const [active, setActive] = useState(true)
  const [points, setPoints] = useState<Array<Array<number>>>([])

  const handlePointerDown = (e: PointerEvent<SVGSVGElement>) => {
    e.preventDefault()
    setPoints([[e.pageX, e.pageY, e.pressure]])
  }

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (e.buttons === 1) {
      e.preventDefault()
      setPoints([...points, [e.pageX, e.pageY, e.pressure]])
    }
  }

  return (
    <>
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{
          touchAction: 'none',
          pointerEvents: active ? 'all' : 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
        }}
      >
        {points && (
          <path
            stroke="black"
            d={getSvgPathFromStroke(
              getStroke(points, {
                size: 24,
                thinning: 0.5,
                smoothing: 0.5,
                streamline: 0.5,
              })
            )}
          />
        )}
      </svg>
      <Tooltip label={active ? 'Switch to mouse' : 'Switch to drawing'}>
        <Box
          position="absolute"
          bottom="10%"
          right="10%"
          onClick={() => setActive(!active)}
        >
          {active ? <MousePointer /> : <Edit2 />}
        </Box>
      </Tooltip>
    </>
  )
}
