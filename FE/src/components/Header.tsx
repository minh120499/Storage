import '../styles/Header.css'
import { Badge } from 'antd';
import { Avatar } from 'antd';

export default function HeaderMenu() {
    return (
        <div className='top-header-menu'>

            <div className='user-box'>
                    <Avatar size="large" src="https://joeschmoe.io/api/v1/minhoccho" />
                <div>
                    <div>username</div>
                    <div>status</div>
                </div>
                <Badge count={1}>
                    <Avatar style={{"background": "white"}} src="https://img.icons8.com/material-outlined/24/000000/appointment-reminders--v1.png" />
                </Badge>
            </div>
        </div>
    )
}
