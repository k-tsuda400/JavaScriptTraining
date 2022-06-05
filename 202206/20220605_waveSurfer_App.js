// 音声バーなど参考
// https://dev.to/jamland/audio-player-with-wavesurfer-js-react-1g3b

import React from "react";
//import { render } from "react-dom";
import WaveSurfer from 'wavesurfer.js';
import { useRef, useEffect, useState } from "react";
// プラグインは、ディレクトリ指定すれば使える
import WaveCursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';

export default function App() {
  const waveformRef = useRef(null);
  const waveformMediaEleRef = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);
  // バックエンド指定（ピッチ変更のための）
  const [mediaElement, setMediaElement] = useState(false);

  useEffect(() => {
    // wavesurfer.jsがオーディオファイルをコントロールするためのオブジェクトを作成
    // waveformRef.currentに入れる
    setPlay(false);

    waveformRef.current = WaveSurfer.create({
      container: waveformRef.current,
      plugins: [
        WaveCursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '20px'
            },
        })
      ], 
      // タイムストレッチでピッチ変えるか否か
      // 参考：https://github.com/katspaugh/wavesurfer.js/issues/149
      // 下のように'WebAudio'と書けば、ピッチは変わる
      // 'MediaElement'と書けば、ピッチが変わらない補正が入る
      backend: 'WebAudio',
      // audioRateとsetPlaybackRateの併用はできないらしい
      // https://wavesurfer-js.org/docs/options.html
      //audioRate: 2.0,
    });

    waveformMediaEleRef.current = WaveSurfer.create({
      container: waveformMediaEleRef.current,
      plugins: [
        WaveCursor.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '20px'
            },
        })
      ], 
      backend: 'MediaElement',
    });

    waveformRef.current.load('https://k-tsuda400.github.io/files/20220305/test.mp3');

    waveformRef.current.on("ready", function() {
      if (waveformRef.current) {
        waveformRef.current.setVolume(volume);
        setVolume(volume);
      }
    });
    waveformMediaEleRef.current.on("ready", function() {
      if (waveformMediaEleRef.current) {
        waveformMediaEleRef.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // 初回はミュート
    waveformMediaEleRef.current.toggleMute();
  }, []);

  // 再生、停止用の関数
  function handlePlayPause() {
    // タイムストレッチ上昇
    // https://wavesurfer-js.org/example/stretcher/index.html
    //waveformRef.current.setPlaybackRate(1.0);
    setPlay(!playing);
    waveformRef.current.playPause();
    waveformMediaEleRef.current.playPause();
  }

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      waveformRef.current.setVolume(newVolume || 1);
      waveformMediaEleRef.current.setVolume(newVolume || 1);
    }
  }

  // ミュートON/OFF
  function handleMute() {
    setMute(!mute);
    waveformRef.current.toggleMute();
    waveformMediaEleRef.current.toggleMute();
    if (mediaElement) {
      waveformRef.current.setMute(true);
    } else {
      waveformMediaEleRef.current.setMute(true);
    }
  }

  // 再生速度変更
  function handlePitchUp() {
    waveformRef.current.setPlaybackRate(2.0);
    waveformMediaEleRef.current.setPlaybackRate(2.0);
  }

  function handlePitchToggle() {
    // 一旦ミュート情報をリセット
    waveformRef.current.setMute(false);
    waveformMediaEleRef.current.setMute(false);

    // トグルを切り替えたタイミングで音声読み込み
    waveformMediaEleRef.current.load('https://k-tsuda400.github.io/files/20220305/test.mp3');
    setMediaElement(!mediaElement);
    // waveformRef.current.toggleMute();
    // waveformMediaEleRef.current.toggleMute();
    console.log(mediaElement)
    waveformRef.current.setMute(!mediaElement);
    waveformMediaEleRef.current.setMute(mediaElement);
  }

  return (
    <>
      {
        mediaElement ?
        <div ref={waveformRef} hidden></div> :
        <div ref={waveformRef}></div>
      }
      {
        mediaElement ?
        <div ref={waveformMediaEleRef}></div> :
        <div ref={waveformMediaEleRef} hidden></div>
      }
      <div id="control">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        {
          mute ?
          <input 
            id="volume" 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            onChange={onVolumeChange}
            defaultValue={volume}
            disabled // ミュート時はボリュームバーを無効化
          /> :
          <input 
            id="volume" 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
        }
        <button onClick={handleMute} id="toggleMuteBtn" className="btn btn-primary">{mute ? "Mute: ON" : "Mute: OFF"}</button>
        <button onClick={handlePitchUp} id="pitch2_0" className="pitch2_0">Pitch 2.0</button>
        <button onClick={handlePitchToggle} id="pitchToggle" className="pitchToggle">{mediaElement ? "Pitch: None" : "Pitch: Shift"}</button>
      </div>
    </>
  );
}