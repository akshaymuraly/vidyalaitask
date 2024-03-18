import { FaAngleDoubleDown } from "react-icons/fa";
import "./GoDownBtn.css"

const GoDownBtn = () => {
  return (
    <a className='go-down-btn-container' href='#generator'>
        <FaAngleDoubleDown className="go-down-btn-logo"/>
    </a>
  )
}

export default GoDownBtn