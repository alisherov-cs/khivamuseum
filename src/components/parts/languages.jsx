import {useState} from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconifyIcon from '../ui/icon'
import {MenuList} from '@mui/material'
import {languages} from '../../i18n'

const LanguageSelect = () => {
    const [language, setLanguage] = useState(languages[0])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleFlagButtonClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleFlagMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLanguageItemClick = langItem => {
        setLanguage(langItem)
        handleFlagMenuClose()
    }

    return (
        <>
            <IconButton onClick={handleFlagButtonClick} size='large'>
                <IconifyIcon icon={language.flag} />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleFlagMenuClose}
                onClick={handleFlagMenuClose}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                sx={{
                    '& .MuiList-root': {
                        padding: 0
                    }
                }}>
                <MenuList className='!p-2 space-y-1'>
                    {languages.map(langItem => {
                        return (
                            <MenuItem
                                className={`!rounded-lg ${langItem.id === language.id ? '!bg-primary2' : null}`}
                                key={langItem.id}
                                onClick={() => handleLanguageItemClick(langItem)}>
                                <ListItemIcon sx={{mr: 2, fontSize: 30}}>
                                    <IconifyIcon icon={langItem.flag} />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        className={`!rounded-lg ${
                                            langItem.id === language.id ? 'text-white' : 'text-black'
                                        }`}>
                                        {langItem.lang}
                                    </Typography>
                                </ListItemText>
                            </MenuItem>
                        )
                    })}
                </MenuList>
            </Menu>
        </>
    )
}

export default LanguageSelect
