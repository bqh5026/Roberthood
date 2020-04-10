import React from 'react';

export default () => (
<div>

    <div className='landing-page-menu'>

        <div>
        <h3>Roberthood</h3>
        <img src={window.logoURL} />
        </div>

        <div className='landing-page-menu-items'>
                <a class='landing-page-menu-item' href='#'>Products</a>
                <a class='landing-page-menu-item' href='#'>Learn</a>
                <a class='landing-page-menu-item' href='#'>Support</a>      
        </div> 

        <div>
        <a href={`/api/session/new`} >Sign In</a>
        </div>

    <div>
    <a href={`/api/users/new`}>Sign Up</a>
    </div>
    
    </div>

    <div>
        <div>
            <header>
                    <h2>Break Free from Commission Fees</h2>
            </header>
        </div>
        <div>
            <img src='roberthood-cash-management.png'/>
        </div>
    </div>

</div>

)

