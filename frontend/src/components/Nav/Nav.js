import { Web3Button } from '@web3modal/react'
import "./Nav.css";
function Nav () {
    return(
        <>
            <nav className="nav">
                <div>
                    <Web3Button />
                </div>              
            </nav>
        </>
    );
}

export default Nav;