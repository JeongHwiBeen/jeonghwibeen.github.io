// Two lanes distinguish live interaction from analysis or control.
const systems = {
  'merry-ai': [
    ['대화 경로', ['Jetson 음성 입력', 'STT 변환', 'LLM 응답', 'TTS 출력']],
    ['분석 경로', ['음성·텍스트', 'FastAPI / Kafka', 'Consumer 분석', 'MongoDB 저장']]
  ],
  'robot-new': [
    ['카메라와 제어', ['Pi 카메라', 'FastAPI / YOLO', '좌표 → 이동', 'Arduino 수거']],
    ['음성과 안내', ['호출어 감지', 'STT 변환', 'LLM 응답', 'TTS 안내']]
  ]
};
export function architecture(slug){
 const lanes=systems[slug];
 if(!lanes)return '';
 return '<div class="lanes">'+lanes.map(([name,nodes])=>`<figure><figcaption>${name}</figcaption><svg role="img" aria-label="${nodes.join('에서 ')} 순서" viewBox="0 0 560 46" xmlns="http://www.w3.org/2000/svg">${nodes.map((label,i)=>`<g transform="translate(${i*143} 0)"><rect x="1" y="2" width="125" height="40" rx="6" fill="#122b40" stroke="#487696"/><text x="63" y="27" text-anchor="middle" fill="#e7f2ff" font-size="14">${label}</text>${i<3?'<path d="M127 22h13m-4-4 4 4-4 4" fill="none" stroke="#77cefd"/>':''}</g>`).join('')}</svg></figure>`).join('')+'</div>';
}
