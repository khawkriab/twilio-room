import ParticipantStrip from '../ParticipantStrip/ParticipantStrip'
import { createStyles, makeStyles } from '@mui/styles'
import MainParticipant from '../MainParticipant/MainParticipant'
import { Theme } from '@mui/material'
import clsx from 'clsx'
import useVideoContext from '../../hooks/useVideoContext/useVideoContext'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        allMonitors: {
            display: 'grid',
            gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
            gridTemplateAreas: '". mainparticipant"',
            gridTemplateRows: '100%',
            alignItems: 'flex-start',
            height: '100vh',
            maxHeight: '100%',
            '&.onlyMainMonitor': {
                gridTemplateAreas: '"mainparticipant"',
                gridTemplateColumns: `auto`,
                gridTemplateRows: '100%',
                gridGap: '6px'
            },
            [theme.breakpoints.down('md')]: {
                gridTemplateAreas: '"mainparticipant" "."',
                gridTemplateColumns: `auto`,
                gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
                gridGap: '6px'
            }
        }
    })
)

export default function Room() {
    const classes = useStyles()
    const { onlyMainMonitor } = useVideoContext()

    return (
        <div
            className={clsx(classes.allMonitors, {
                onlyMainMonitor
            })}
        >
            <ParticipantStrip />
            <MainParticipant />
        </div>
    )
}
