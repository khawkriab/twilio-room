import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Person from '@material-ui/icons/Person'
import { StateContextType } from '../../../state'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    red: {
        color: 'white',
        backgroundColor: '#F22F46'
    }
})

export function getInitials(name: string) {
    return name
        .split(' ')
        .map((text) => text[0])
        .join('')
        .toUpperCase()
}

export default function UserAvatar({ user }: { user: StateContextType['user'] }) {
    const classes = useStyles()
    const { displayName, photoURL } = user!

    return photoURL ? (
        <Avatar src={photoURL} />
    ) : (
        <Avatar className={classes.red}>{displayName ? getInitials(displayName) : <Person />}</Avatar>
    )
}
