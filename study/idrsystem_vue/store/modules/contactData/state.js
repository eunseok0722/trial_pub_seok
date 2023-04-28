import companyInfo from '~/store/modules/companyInfo'

const state = () => ({
  txtDbContact: {
    introInfo: {
      birthYear: '2010',
      birthMonth: '6',
      birthDay: '30',
      time: [
        { num: '10', txt: '년' },
        { num: '3,650', txt: '일' },
        { num: '87,600', txt: '시간' },
        { num: '315,360,000', txt: '초' }
      ],
      pageTit:
        '그냥 만들어진 숫자가 아닙니다.<br>\n' +
        '\t\t\t\t\t\t그만큼 많은 직원들과 함께 전문성을 키우고 <br class="only_pc">가치를 높였기에 가능한 숫자가 되었습니다.',
      pageDesc:
        '시스템 통합구축에 대한 최고의 전문성과 기술력을 바탕으로 Omni Channel기반의\n' +
        '\t\t\t\t\t\t온.오프라인 고객DB통합 및 옴니채널 커머스 시스템 구축 등 스마트샵 전문기업으로서\n' +
        '\t\t\t\t\t\t끊임없는 기술개발 노력을 진행중입니다.',
      tabeDesc1: '전문성과 기술력을<br>바탕으로 다양한<br>전문기술력',
      tabeDesc2:
        '시스템 구축 등 스마트샵 전문기업으로서 끊임없는 <br>기술 개발 노력을 진행 중입니다.',
      tabeDesc3:
        'IDR은 단지 이윤과 효율을 추구하기 보다는 임직원들의 행복, 자기실현, 삶의 가치를 더 우선시하고 있습니다.'
    },
    historyInfo: {
      pageTit: '도전 · 전진 · 끊임없는 노력',
      pageDesc:
        '㈜아이디알시스템은2010년 6월에 설립되어 끊임없는 도전과 전진을 <br class="only_pc"> 반복하며 ICT 분야에서 빠르게 성장하고 있습니다. <br class="only_pc"> IDR은 현재에 안주하지 않고 더 나은 미래를 준비하는 협업과 동의 Business Platform을 구축하고, ICT Leading Company로 성장해 나가겠습니다.',
      hisListData: [
        {
          c: 'side_l',
          year: '2023',
          monList: [
            {
              month: '03',
              con: ' 본사 이전 <br class=\'only_m\'><span class="only_pc">(</span>서울특별시 마포구 만리재로 47 <br class=\'only_m\'>공덕코어<span class="only_pc">)</span>'
            }
          ]
        },
        {
          c: 'side_r',
          year: '2022',
          monList: [
            {
              month: '05',
              con: ' 아이온커뮤니케이션즈와 아이디알시스템 쇼핑몰 솔루션 구축 파트너사 업무협약체결'
            }
          ]
        },
        {
          c: 'side_l',
          year: '2021',
          monList: [
            {
              month: '03',
              con: ' Comm\'ON (컴온)<br class=\'only_m\'> 전자상거래 SW저작권등록'
            }
          ]
        },
        {
          c: 'side_r',
          year: '2020',
          monList: [
            {
              month: '10',
              con: ' 본사 이전 <br class=\'only_m\'> <span class="only_pc">(</span>서울 영등포구 양평로22길 21, <br class=\'only_m\'>코오롱디지털타워<span class="only_pc">)</span>'
            }
          ]
        },
        {
          c: 'side_l',
          year: '2018',
          monList: [
            {
              month: '05',
              con: ' 본사 이전 <br class=\'only_m\'> <span class=\'only_pc\'>(</span> 영등포구 양평로21길 26, 8층 <br class=\'only_m\'> 아이에스비즈타워1차<span class=\'only_pc\'>)</span>'
            }
          ]
        },
        {
          c: 'side_r',
          year: '2017',
          monList: [{ month: '03', con: ' 현대홈쇼핑 상시개발업체 선정' }]
        },
        {
          c: 'side_l',
          year: '2015',
          monList: [
            {
              month: '08',
              con: ' 기술혁신형 중소기업(INNO-BIZ) 인증 <br class=\'only_m\'> (제150103-01098호)'
            },
            {
              month: '05',
              con: ' 삼성SDS 2015년도 Certified partner(협력사)로 선정'
            },
            {
              month: '05',
              con: ' 본사 이전 <br class=\'only_m\'> <span class="only_pc">(</span>서울 성동구 아차산로 67-16, 9층  <br class=\'only_m\'> <span class="only_pc">(</span>성수동2가,세종빌딩3<span class="only_pc">)</span>'
            }
          ]
        },
        {
          c: 'side_r',
          year: '2014',
          monList: [
            {
              month: '12',
              con: ' 기업부설연구소로 연구소 승격 (IDR 옴니채널 연구소 – 제2014115962호)'
            },
            {
              month: '05',
              con: ' 삼성SDS 2014년도 Certified partner(협력사)로 선정'
            }
          ]
        },
        {
          c: 'side_l',
          year: '2013',
          monList: [
            {
              month: '12',
              con: ' 독일 E-commerce solution 업체인 Hybris software와 partnership 계약'
            },
            {
              month: '11',
              con: ' 상호변경 ㈜쓰리에이파트너스  <br class=\'only_m\'> →  ㈜아이디알시스템'
            },
            { month: '07', con: ' 벤처기업등록 (제 20130107370호)' },
            { month: '05', con: ' 연구개발전담부서 설립 ( 제 201315432호)' }
          ]
        },
        {
          c: 'side_r',
          year: '2010',
          monList: [
            { month: '11', con: ' 대표이사 정운평 사임  및  송돈섭 취임' },
            {
              month: '06',
              con: ' ㈜쓰리에이파트너스 설립 <br class=\'only_m\'> (납입자본금: 50백만원)'
            }
          ]
        }
      ]
    },
    recruitInfo: [
      {
        tit: '인재상',
        desc:
          '(주)아이디알시스템은 상호 경쟁을 추구하지 않으며 소중한 개인의 인격을 존중합니다.<br>\n' +
          '                        더 이상 IT 전문가들이 3D 직업이 아닌 당당한 전문가 직업임을 알리고 그렇게 실천해 가는 기업입니다.<br>\n' +
          '                        ‘ 가족같은 분위기 ’ 라는 말로 더 이상 팀워크를 강요하지 않습니다. <br class="only_m"> 이젠 상식이 통하는 기업, 그리고 그런 인격이 있는 분을 찾습니다.',
        list: [
          '#기본에 충실한 사람',
          '#가족같은 분위기가  아닌 일 잘하는 사람',
          '#상식적인 사람',
          '#타인의 프라이버시를 존중할 줄 아는 사람',
          '#자신의 발전에 게으르지 않는 사람',
          '#라떼는 말이지가 아닌 아메를 좋하는 사람'
        ]
      },
      {
        tit: '복지',
        desc: '이젠 기본이 되어야 하고 그 기본을 잘 지켜야 하는 것이 기업의 의무와 책임입니다. <br class=\'only_m\'>당연한게 지켜지지 않고 있는 곳이 많습니다.  <br class=\'only_m\'> 당연히 누려야 할 여러분의 권리입니다.',
        list: [
          {
            img: 'cntc_icon_01.png',
            con: '4대보험<span> 국민연금, 건강, 고용, 산재</span>'
          },
          {
            img: 'cntc_icon_02.png',
            con: '우수사원 표창 · 포상<span> 세미나, 전시회 참석</span>'
          },
          {
            img: 'cntc_icon_03.png',
            con: '연·월차, 경조휴가<span> 연·월차,경조휴가</span>'
          },
          {
            img: 'cntc_icon_04.png',
            con: '경조사 지원<span> 화환, 경조금 지원 등</span>'
          },
          {
            img: 'cntc_icon_05.png',
            con: '행사 & 회식<span> 정기 회식, 팀 회식, 생일파티등</span>'
          },
          {
            img: 'cntc_icon_06.png',
            con: '자기계발비 지원 · 성과급<span>자기계발비 지원 / 성과급 지원</span>'
          }
        ]
      },
      {
        tit: '문화',
        desc: '문화는 만들어져있는걸 그대로 받아들이는게 아닌 우리가 만들어가는 현재진행형입니다. <br class="only_m">함께 만들어갈 준비가 되어있는 기업입니다.',
        list: [
          { con: '저녁있는 <br class="only_m"> 나의 삶' },
          {
            con: '내 가족은 집에~<br>회사는 <br class="only_m">일을 위한 곳!'
          },
          { con: '상식적으로 <br class="only_m"> 일하기' },
          {
            con: '편의점이 <br class="only_m"> 휴게실 안에 있다!'
          },
          { con: '사무실 뷰가<br>내 집이었으면 ~' },
          { con: '눈치가 머야?<br>먹는거야?' }
        ]
      },
      {
        tit: '모집분야 및 입사지원 방법',
        desc:
          '나를 표현하는 것 또한 능력이라고 생각합니다. <br class="only_m"> 자신의 능력을 마음껏 제시해주시기 바랍니다. <br>' +
          '                        입사지원 분야를 표시하시고 입사지원 자료를 첨부하여 아래 이메일 주소로 발송해주시면 검토 후 서류전형 합격자에 한하여 개별 인터뷰를 진행하게 됩니다.',
        list: [
          {
            num: '1',
            con: '입사지원 자료<span>이력서, 자기소개서, 포트폴리오</span>'
          },
          {
            num: '2',
            con:
              '입사신청 이메일<a href="javascript:copyText(\'' +
              companyInfo.state().mail +
              '\')"><span>' +
              companyInfo.state().mail +
              '</span></a>'
          },
          {
            num: '3',
            con:
              '채용 담당자<span>' + companyInfo.state().manager + '</span>'
          }
        ]
      }
    ]
  }
})
export default state
