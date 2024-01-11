import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { Client } from '@stomp/stompjs';
import axios from 'axios';


const WebRTCComponent = () => {
  const [peer, setPeer] = useState(null);
  const [myPeerId, setMyPeerId] = useState('');
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [client, setClient] = useState(null);
  const [peerId, setPeerId] = useState('');
const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
const remoteVideoRef = useRef(null);
const currentUserVideoRef = useRef(null);
const peerInstance = useRef(null);
const [recieving, setRecieving] = useState(false);


  const sendSignal = async (message) => {
   axios.post('http://localhost:8083/SpringMVC/send', message).then((response) => {
      console.log(response)
    }, (error) => {
      console.log(error);
    }
    );
  };


  useEffect(() => {

   
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8083/SpringMVC/websocket',
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = function (frame) {
      console.log('Connected to STOMP server');
      stompClient.subscribe('/queue/messages', function (message) {
        console.log(message.body);
        const data = JSON.parse(message.body);
      });
    };

    stompClient.onStompError = function (frame) {
      console.log('Error:', frame);
    };

    stompClient.activate();
    setClient(stompClient);

    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id)
      console.log('My peer ID is: ' + id);
    });

    peer.on('call', (call) => {
      var getUserMedia = navigator.getUserMedia 
      || navigator.webkitGetUserMedia 
      || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream)
        call.on('stream', function(remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    })
  peerInstance.current = peer;

   
  }, [stream]);


  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia 
    || navigator.webkitGetUserMedia 
    || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)
      console.log(mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });
  }

 const sendCallSignal = () => {
    const message = {
      type: 'call',
      callerId: peerId,
      //calleeId: remotePeerIdValue,
    };
    sendSignal(message);
  };



  return (
    <div className="App" style={{ textAlign: 'center' }}>
    <h1>Current user id is {peerId}</h1>
    <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} style={{ width: '200px', height: '30px', fontSize: '16px' }} />
    <button onClick={() => call(remotePeerIdValue)} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor:'green' }}>Call</button>
    <button onClick={() => sendCallSignal()} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor:'green' }}>send signal</button>

    <div style={{ marginTop: '20px' }}>
      <video ref={currentUserVideoRef} style={{ width: '300px', height: '200px' }} />
    </div>
    <div style={{ marginTop: '20px' }}>
      <video ref={remoteVideoRef} style={{ width: '300px', height: '200px' }} />
    </div>
  </div>
  );
};

export default WebRTCComponent;
