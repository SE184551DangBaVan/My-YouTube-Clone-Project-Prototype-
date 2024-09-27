import { AccountCircleOutlined, DisplaySettings, PrivacyTipOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SideMenuSettingsPage() {
  return (
    <>
      <div className="sideMenu">
        <div className="sideTop">
          <Button><AccountCircleOutlined className="sideMenuIcons"/><span>Account</span></Button>
          <Button><DisplaySettings className="sideMenuIcons"/><span>Display</span></Button>
          <Button><PrivacyTipOutlined className="sideMenuIcons"/><span>Privacy</span></Button>
        </div>
      </div>
    </>
  )
}
