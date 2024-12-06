import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/router";

// Material-UI
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import EditOutlined from "@ant-design/icons/EditOutlined";
import ProfileOutlined from "@ant-design/icons/ProfileOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import WalletOutlined from "@ant-design/icons/WalletOutlined";

// Component Props Interface
interface ProfileTabProps {
  handleLogout?: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ handleLogout }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleListItemClick = (index: number, url?: string) => {
    setSelectedIndex(index);

    if (url) {
      router.push(url);
    }

    if (index === 2 && handleLogout) {
      handleLogout();
    }
  };

  return (
    <List
      component="nav"
      sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleListItemClick(0, "/edit-profile")}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, "/profile")}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() => handleListItemClick(3, "/apps/profiles/account/personal")}
      >
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={() => handleListItemClick(4, "/apps/invoice/details/1")}
      >
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => handleListItemClick(2)}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;
