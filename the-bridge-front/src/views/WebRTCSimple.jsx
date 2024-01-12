import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const ConnectionStatus = {
  OFFERING: 'OFFERING',
  RECEIVING: 'RECEIVING',
  CONNECTED: 'CONNECTED',
};

const webSocketConnection = new WebSocket('ws://localhost:8083/SpringMVC/videochat');

export const WebRTCSimple = () => {
  const videoSelf = useRef(null);
  const videoCaller = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [offerSignal, setOfferSignal] = useState();
  const [peer, setPeer] = useState();

  useEffect(() => {
    webSocketConnection.onopen = () => console.log('WebSocket connected 1');
    webSocketConnection.onmessage = (message) => {
      console.log("the message is", message);
      const payload = JSON.parse(message.data);
      if (payload?.type === 'offer') {
        setOfferSignal(payload);
        console.log(payload);
        setConnectionStatus(ConnectionStatus.RECEIVING);
      } else if (payload?.type === 'candidate') {
        const candidate = payload.candidate;
        console.log('Received ICE candidate:', candidate);
        if (peer) {
          peer.addIceCandidate(candidate).catch((error) => {
            console.error('Error adding ICE candidate:', error);
          });
        } else {
          console.error('No peer connection available to add ICE candidate.');
        }
      } else if (payload?.type === 'answer') peer?.signal(payload);
    };
  }, [peer]);  // Removed the dependency array from here

  const sendOrAcceptInvitation = (isInitiator, offer) => {
    console.log('offfffffffffff', offer);
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
      console.log("my media stream is", mediaStream);
      const video = videoSelf.current;
      video.srcObject = mediaStream;

      const newPeer = new SimplePeer({
        initiator: isInitiator,
        stream: mediaStream,
      });

      if (isInitiator) setConnectionStatus(ConnectionStatus.OFFERING);
      else offer && newPeer.signal(offer);

      newPeer.on('signal', (data) => webSocketConnection.send(JSON.stringify(data)));
      newPeer.on('connect', () => {
        setConnectionStatus(ConnectionStatus.CONNECTED);
        console.log('Peer connected!');
      });
      newPeer.on('error', (err) => {
        console.error('Error in peer connection:', err);
      });
      newPeer.on('stream', (remoteStream) => {
        console.log('received stream');
        console.log('remote stream is', remoteStream);
        videoCaller.current.srcObject = remoteStream;
        videoCaller.current.play();
        console.log('video caller currrent ', videoCaller.current);
        console.log('video caller is ', videoCaller.current.srcObject);
      });

      setPeer(newPeer);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {connectionStatus === null && (
        <button
          onClick={() => sendOrAcceptInvitation(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          CALL
        </button>
      )}
      {connectionStatus === ConnectionStatus.OFFERING && (
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      )}
      {connectionStatus === ConnectionStatus.RECEIVING && (
        <button
          onClick={() => sendOrAcceptInvitation(false, offerSignal)}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          ANSWER CALL
        </button>
      )}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <video ref={videoSelf} autoPlay className="w-64 h-48 bg-black" />
        {videoCaller && <video ref={videoCaller} className="w-64 h-48 bg-black" />}
      </div>
    </div>
  );
};
