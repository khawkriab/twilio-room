import { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuContainer from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreIcon from '@mui/icons-material/MoreVert'
import AboutDialog from '../../AboutDialog/AboutDialog'
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog'

export default function Menu() {
    const [aboutOpen, setAboutOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const anchorRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={anchorRef}>
            <IconButton color='inherit' onClick={() => setMenuOpen((state) => !state)}>
                <MoreIcon fontSize='large' />
            </IconButton>
            <MenuContainer open={menuOpen} onClose={() => setMenuOpen((state) => !state)} anchorEl={anchorRef.current}>
                <MenuItem onClick={() => setAboutOpen(true)}>About</MenuItem>
                <MenuItem onClick={() => setSettingsOpen(true)}>Settings</MenuItem>
            </MenuContainer>
            <AboutDialog
                open={aboutOpen}
                onClose={() => {
                    setAboutOpen(false)
                    setMenuOpen(false)
                }}
            />
            <DeviceSelectionDialog
                open={settingsOpen}
                onClose={() => {
                    setSettingsOpen(false)
                    setMenuOpen(false)
                }}
            />
        </div>
    )
}
