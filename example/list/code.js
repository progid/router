import router from './routerinstance.js';

const earthButton = document.querySelector('.menu .item.earth');
const waterButton = document.querySelector('.menu .item.water');
const airButton = document.querySelector('.menu .item.air');
const fireButton = document.querySelector('.menu .item.fire');

earthButton.addEventListener('click', () => router.push('/earth'), false);
waterButton.addEventListener('click', () => router.push('/water'), false);
airButton.addEventListener('click', () => router.push('/air'), false);
fireButton.addEventListener('click', () => router.push('/fire'), false);