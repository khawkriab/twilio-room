import ParticipantStrip from '../ParticipantStrip/ParticipantStrip'
import { createStyles, makeStyles } from '@mui/styles'
import MainParticipant from '../MainParticipant/MainParticipant'
import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        pictureInPicture: {
            gridTemplateAreas: '"participantList" "."',
            gridTemplateColumns: `auto`,
            gridTemplateRows: '100%',
            gridGap: '6px'
        },
        screen: {
            display: 'grid',
            gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
            gridTemplateAreas: '". participantList"',
            gridTemplateRows: '100%',
            alignItems: 'flex-start',
            height: '100vh',
            maxHeight: '100%',
            [theme.breakpoints.down('xs')]: {
                gridTemplateAreas: '"participantList" "."',
                gridTemplateColumns: `auto`,
                gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
                gridGap: '6px'
            }
        }
    })
)

export default function Room() {
    const classes = useStyles()

    return (
        <div className={classes.screen}>
            <ParticipantStrip />
            <MainParticipant />
        </div>
    )
}
