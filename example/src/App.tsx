import React, { useState } from 'react';
import TwilioRoom from 'twilio-room';
// import TwilioRoom from 'twilio-room-mark2';
//  import {TwilioRoom} from 'twilio-room-mask2'

const t =
  'eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTSzhmMTY0ZTRiYTQ1MDIwYWM5NWNhYjg4MzA5ZDFjZjNhIiwiZXhwIjoxNjk4NzQ2NjM0LCJncmFudHMiOnsiaWRlbnRpdHkiOiLguKPguLDguJ7guLXguJ7guLHguJLguJnguYwg4LiI4Li04LiV4Lih4Liy4Lil4Lii4LmMIiwidmlkZW8iOnsicm9vbSI6IlBIQVJNMDMyMzEwMzEtMDAwMDQifX0sImp0aSI6IlNLOGYxNjRlNGJhNDUwMjBhYzk1Y2FiODgzMDlkMWNmM2EtMTY5ODc0MzA0MCIsInN1YiI6IkFDZTcxZjlmODIyZmI3NDE1MTdkYmI0YWMzMGMzNTRhZjAifQ.IMtcwsxqMl6zJmZ0MttNpH7dU9-umb6jr7GoXSrcrII';

export const App = () => {
  const [isPnP, setIsPnP] = useState<boolean>(false);
  const sessionEventHandlers = {
    publishPriorityChanged: (event: any) => {
      console.log('publishPriorityChanged: ', event);
    },
    dominantSpeakerChanged: (event: any) => {
      console.log('dominantSpeakerChanged: ', event);
    },
    dimensionsChanged: (event: any) => {
      console.log('dimensionsChanged: ', event?.isEnabled);
    },
    published: (event: any, a: any) => {
      console.log('published: ', event, a);
    },
    started: (event: any) => {
      // console.log('started: ', event);
    },
    subscribed: (event: any, publication: any, participant: any) => {
      // console.log('subscribed: ', event?.isEnabled);
      // participant?.on('trackEnabled', (e: any) => console.log('e:', e));
    },
    switchedOff: (event: any) => {
      console.log('switchedOff: ', event);
    },
    switchedOn: (event: any) => {
      console.log('switchedOn: ', event);
    },
    warning: (event: any) => {
      console.log('warning: ', event);
    },
    reconnected: () => {
      console.log('reconnected:');
    },
    reconnecting: (event: any) => {
      console.log('reconnecting: ', event);
    },

    enabled: (event: any) => {
      console.log('enabled: ', event);
    },
    disabled: (event: any) => {
      console.log('disabled: ', event);
    },
  };

  return (
    <div style={{ height: '80vh', border: '4px solid #00f' }}>
      <div>
        <button onClick={() => setIsPnP(!isPnP)}>pnp</button>
      </div>
      <div style={{ height: '60vh', border: '4px solid #f00' }}>
        <TwilioRoom
          token={t}
          showOnlyMainParticipant={isPnP}
          eventHandlers={sessionEventHandlers}
          // onClickEndcall={() => console.log('endcall:')}
          onConnected={(e) => console.log('e:', e)}
        />
      </div>
    </div>
  );
};
