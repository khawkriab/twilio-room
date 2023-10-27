import React, { createContext } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useSpeakerViewParticipants from '../../hooks/useSpeakerViewParticipants/useSpeakerViewParticipants';

/**
 * The purpose of the ParticipantProvider component is to ensure that the hooks useGalleryViewParticipants
 * and useSpeakerViewParticipants are not unmounted as users switch between Gallery View and Speaker View.
 * This will make sure that the ordering of the participants on the screen will remain so that the most
 * recent dominant speakers are always at the front of the list.
 */

export interface IParticipantContext {
  speakerViewParticipants: RemoteParticipant[];
}

export const ParticipantContext = createContext<IParticipantContext>(null!);

export const ParticipantProvider: React.FC = ({ children }) => {
  const speakerViewParticipants = useSpeakerViewParticipants();

  return (
    <ParticipantContext.Provider
      value={{
        speakerViewParticipants,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};
