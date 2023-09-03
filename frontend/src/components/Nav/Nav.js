import { Web3Button } from '@web3modal/react'
import "./Nav.css";
function Nav () {
    return(
        <>
            <nav className="nav">
                <div>
                    {
                        /* <h1>This is Nav Bar</h1> */
                    }
                </div>

                <div>
                    <Web3Button />
                </div>              
            </nav>
        </>
    );
}

export default Nav;