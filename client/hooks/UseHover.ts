import { useState } from 'react'
const UseHover = () => {
    const [hovering, setIsHovering] = useState(false)
    const onMouseEnter = ()=> setIsHovering(true)
    const onMouseLeave = ()=> setIsHovering(false)
    return {
        hovering,
        onMouseEnter,
        onMouseLeave,
      };
}

export default UseHover
