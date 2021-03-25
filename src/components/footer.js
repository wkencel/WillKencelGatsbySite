/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from "gatsby"
import { RiHeart2Line } from "react-icons/ri";

const Footer = () => (
  <footer 
    className="site-footer"
    sx={{
      bg: 'primary'
    }}
  >
    <div className="container">
      <p>Copyright © 2021 Will Kencel. All Rights Reserved.<span className="icon -love"><RiHeart2Line/></span> by <Link to="/">WillKencel.com</Link></p>
    </div>
  </footer>
)

export default Footer