// import { AsyncStorage } from 'react-native';
// import _ from 'underscore';
// import Config from '../config';
//
// function withLeadingZero(amount) {
//   if (amount < 10) {
//     return `0${amount}`;
//   }
//   return `${amount}`;
// }
//
// export function formattedTime(timeInSeconds) {
//   const minutes = Math.floor(timeInSeconds / 60);
//   const seconds = timeInSeconds - minutes * 60;
//
//   if (isNaN(minutes) || isNaN(seconds) || minutes < 0 && seconds < 0) {
//     return '';
//   }
//   return (`${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`);
// }
//
// export function findSongInCollection(id, songs) {
//   return songs.filter(song => song.id == id).length;
// }
//
// export function isAudioObject(contentType) {
//   return contentType == 'audio/mpeg';
// }
//
// export function getSongName(contentDescription) {
//   return contentDescription.split('=')[1].replace(/"/g, '').split('.mp3')[0];
// }
//
// export function filterSearchResults(res) {
//   return res.items.map(item => ({
//     id: item.id.videoId,
//     artist: item.snippet.channelTitle,
//     title: item.snippet.title,
//     thumb: item.snippet.thumbnails.high.url,
//     path: getSongUrl(item.id.videoId),
//     key: item.id.videoId
//   }));
// }
//
// export function getSongUrl(id) {
//   // TODO : songs list?
//   return `${Config.API_URL}`;
// }
//
// export async function getSongsFromStorage() {
//   let songs = await AsyncStorage.getItem('songs');
//   songs = songs || JSON.stringify([]);
//   return JSON.parse(songs);
// }
//
// export async function getSongFromStorage(id) {
//   let songs = await AsyncStorage.getItem('songs');
//   songs = songs || JSON.stringify([]);
//   return _.findWhere(JSON.parse(songs), { id });
// }
//
// export async function getSongInfo(path, recoverId) {
//   const res = await fetch(recoverId ? getSongUrl(recoverId) : path);
//   const data = await res.json();
//   if (data.status) return data;
//   throw data.error;
// }
//
// export async function setSongsToStorage(songs, recover) {
//   let storageSongs = await getSongsFromStorage();
//   storageSongs = recover ? deleteRecoverSongs([...storageSongs], [...songs]) : storageSongs;
//   const newSongs = [...storageSongs, ...songs];
//   await AsyncStorage.setItem('songs', JSON.stringify(newSongs));
//   return newSongs;
// }
//
// export function getThumbUrl(id) {
//   return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
// }
//
// function deleteRecoverSongs(oldSongs, newSongs) {
//   return _.filter(oldSongs, song => !_.findWhere(newSongs, { id: song.id }));
// }