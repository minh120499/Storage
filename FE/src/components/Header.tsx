import "../styles/Header.css";
import { Badge } from "antd";
import { Avatar } from "antd";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

export default function HeaderMenu() {
    const currentUser = useSelector((state: RootState) => state.user);

    return (
        <div className="top-header-menu">
            <div className="user-box">
                <Avatar size="large" src={`${currentUser?.image}`}>
                    {currentUser?.username}
                </Avatar>
                <div>
                    <div>{currentUser.username}</div>
                    {/* <div>status</div> */}
                </div>
            </div>
        </div>
    );
}
