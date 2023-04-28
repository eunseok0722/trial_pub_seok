const state = () => ({
  year2022: {
    type: 'base',
    title: '2022',
    contents: [
      {
        id: '1',
        num: 'works_2022_01',
        pc: 'hanacard/works_img.png',
        mo: 'hanacard/works_img_mo.png',
        logo: 'hanacard/works_logo.png',
        logo_mo: 'hanacard/works_logo_mo.png',
        date: '2022.02 ~ <span class="only_pc">2022.</span>08',
        title: '기업카드 오픈웹 전환 / <br >비대면 채널 고도화 <br class="only_m">프로젝트',
        txt: '기업카드 오픈웹 전환 / 비대면 채널 고도화 프로젝트',
        content: [
          {
            list: [
              {
                li: 'IT환경 변화로 인한 필수 업무의 연속성 유지 <br class="only_m"><span class="wifd_sub_con">(IE 서비스 종료로 표준브라우저 운영 사이트 개발)</span>'
              },
              { li: '구매카드시스템 전환 개발' },
              { li: '기업카드 신규/한도증액 프로세스 개발' },
              {
                li: '홈페이지 통합으로 이용가능 서비스 확대 및 모바일 채널 추가'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2022_02',
        pc: 'atomy/works_img.png',
        mo: '',
        logo: 'atomy/works_logo.png',
        date: '2021.12 ~ 2022.12',
        title: '애터미 <br class="only_m"> 쇼핑몰 구축 개발',
        txt: '애터미 <br class="only_m"> 쇼핑몰 구축 개발',
        content: [
          {
            list: [
              { li: '삼성 SDS 넥스프라임 기반 구축' },
              { li: 'front/back Office 상품.전시 영역 개발' }
            ]
          }
        ]
      }
    ]
  },
  year2021: {
    type: 'base',
    title: '2021',
    contents: [
      {
        id: '1',
        num: 'works_2021_01',
        pc: 'eland_qualqual/works_img.png',
        mo: 'eland_qualqual/works_img_m.png',
        logo: 'eland_qualqual/works_logo.png',
        date: '2020.11 ~ 2021.02',
        title: `이랜드 신규브랜드
              <br>콸콸 구축 및 운영`,
        txt: '이랜드그룹<span class="only_pc">의</span> <br class="only_m">콸콸쇼핑몰(셀러몰) 구축',
        content: [
          {
            list: [
              {
                li: 'MSA (Micro Service Architecture)기반 <br class="only_t">IDR Comm’On Solution적용 구축'
              },
              {
                li: '셀러들이 지인들과 공유할 상품을 서랍에 담은 후, <br class="only_t">카카오톡을 통해 상품정보를 공유'
              },
              {
                li: '지인들이 공유된 상품을 주문하면 셀러들에게 <br class="only_t">인센티브를 지급'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2021_02',
        pc: 'hyundai_arket/works_img.png',
        mo: 'hyundai_arket/works_img_mo.png',
        logo: 'hyundai_arket/works_logo.png',
        date: '2021.05  ~ <span class="only_pc">2021.</span>12',
        title: `현대백화점
               <br>아르켓 (ARKET) <br class="only_m">온라인 쇼핑몰 구축`,
        txt: '글로벌 브랜드 <br class="only_m">사이트 구축',
        content: [
          {
            list: [
              { li: '더현대닷컴 Platform기반' },
              { li: 'ARKET Global Guide Line 준용' },
              { li: '물류 API연동과 더현대닷컴 ERP시스템과 연계' }
            ]
          }
        ]
      },
      {
        id: '3',
        num: 'works_2021_03',
        pc: 'dongbanmall/works_img.png',
        mo: 'dongbanmall/works_img_mo.png',
        logo: 'dongbanmall/works_logo.png',
        logo_mo: 'dongbanmall/works_logo_mo.png',
        date: '2021.04 ~ 2022.02',
        title: `중소기업유통센터
               <br>‘가치삽시다’ 연간 운영`,
        txt: '가치삽시다 <span class="only_pc">- </span><br class="only_m">연간 운영 계약',
        content: [
          {
            list: [
              { li: "1인 소상공인 미디어 플랫폼 '가치삽시다' 연간 운영" }
            ]
          }
        ]
      },
      {
        id: '4',
        num: 'works_2021_04',
        pc: 'seegene/works_img.png',
        mo: 'seegene/works_img_mo.png',
        logo: 'seegene/works_logo.png',
        date: '2021.06 ~ <span class="only_pc">2021.</span>11',
        title: '씨젠의료재단 <br >차세대 정보화 시스템 <br class="only_t">구축 전략 컨설팅',
        txt: '씨젠의료재단 <br class="only_m">차세대 정보화 시스템 구축 전략 컨설팅',
        content: [
          {
            list: [
              { li: 'As-Is 업무체계분석,현안분석 및 개선기회도출' },
              { li: 'LIS 분석,LIS 개선방향 수립,차세대 LIS 기본설계' }
            ]
          }
        ]
      }
    ]
  },
  year2020: {
    type: 'base',
    title: '2020',
    contents: [
      {
        id: '1',
        num: 'works_2020_01',
        pc: 'glyde/works_img.png',
        mo: 'glyde/works_img_mo.png',
        logo: 'glyde/works_logo.svg',
        date: '2019.11 ~ 2020.06',
        title: `하림그룹의 신제조 및 <br class="only_m">신유통
                <br class="only_pc">개념이 결합된  <br class="only_m">온라인 커머스 사업`,
        txt: '글라이드 쇼핑몰 구축 <span class="wifd_sub">(식품 전문 쇼핑몰 구축)</span>',
        content: [
          {
            list: [
              {
                li: 'Spring boot 기반의 시스템 구축으로 Cloud 환경에 배포 및 확장이 용이한 시스템 구축'
              },
              { li: 'Vue.js를 사용하여 사용자 UI/UX 개선' }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2020_02',
        pc: 'lotteon/works_img.png',
        mo: 'lotteon/works_img_mo.png',
        logo: 'lotteon/works_logo.png',
        logo_mo: 'lotteon/works_logo_mo.png',
        date: '2019.11 ~ 2020.04',
        title: `롯데그룹 유통계열사<br class="only_m"> 7개
                <br class="only_pc">통합 쇼핑몰 <br class="only_m"> 구축에 참여`,
        txt: '롯데온 <br class="only_m">프리미엄몰 구축',
        content: [
          {
            list: [
              { li: '전시 (Front / Backoffice) 구축' },
              { li: '롯데온 (www.lotteon.com) 프리미엄몰 구축' }
            ]
          }
        ]
      },
      {
        id: '3',
        num: 'works_2020_03',
        pc: 'hyundai_greating/works_img.png',
        mo: 'hyundai_greating/works_img_mo.png',
        logo: 'hyundai_greating/works_logo.png',
        date: '2020.06 ~ 2020.12',
        title: `현대그린푸드
                <br>그리팅몰 기능개선 완료`,
        txt: '현대그린푸드의 <br class="only_m">그리팅 기능개선',
        content: [
          {
            list: [
              { li: '현대그린푸드 신사업 온라인몰(Greating) 기능개선' },
              { li: '생산관리 시스템 등 유관 시스템 및 서비스 연동' }
            ]
          }
        ]
      }
    ]
  },
  year2019: {
    type: 'base',
    title: '2019',
    contents: [
      {
        id: '1',
        num: 'works_2019_01',
        pc: 'chilsung/works_img.png',
        mo: 'chilsung/works_img_mo.png',
        logo: 'chilsung/works_logo.png',
        date: '2019.05 ~ <span class="only_pc">2019.</span>11',
        title: `롯데 이커머스의 LECS <br class="only_m">플랫폼을
                  <br class="only_pc">기반으로 <br class="only_m">롯데칠성몰 구축참여`,
        txt: '롯데 칠성몰 구축',
        content: [
          {
            list: [
              {
                li: '롯데이커머스 LECS Platform 기반 식품전문 <br class="only_m">몰 구축'
              },
              { li: '정기주문 / 정기배송 Process' },
              { li: 'SAP ERP 주문 연계' },
              { li: 'Fornt 주문 / 결제 및 Back Office 영역 개발' }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2019_02',
        pc: 'conran/works_img.png',
        mo: 'conran/works_img_mo.png',
        logo: 'conran/works_logo.png',
        logo_mo: 'conran/works_logo_mo.png',
        date: '2019.05 ~ <span class="only_pc">2019.</span>11',
        title: '한국에 상륙한 영국의<br class="only_m"> 명품 가구 편집샵<br> 더 콘란샵.',
        txt: '더콘란샵 구축 <br><span class="wifd_sub">(영국의 명품 가구 편집샵)</span>',
        content: [
          {
            list: [
              { li: '롯데이커머스 LECS Platform 기반' },
              { li: '더콘란샵 Global Guide Line 준용' },
              { li: '롯데백화점 ERP 시스템과 연계' },
              { li: '주문제작형 가구 주문 처리 구현' }
            ]
          }
        ]
      },
      {
        id: '3',
        num: 'works_2019_03',
        pc: 'uniqlo/works_img.png',
        mo: 'uniqlo/works_img_mo.png',
        logo: 'uniqlo/works_logo.png',
        logo_mo: 'uniqlo/works_logo_mo.png',
        date: '2019.05 ~ <span class="only_pc">2019.</span>11',
        title: `유니클로 Store Pick
                 <br>매장에서 Pickup!`,
        txt: '유니클로 <br>Store Pick',
        content: [
          {
            list: [
              { li: '롯데이커머스 LECS Platform 기반' },
              { li: '유니클로 매장 재고 연계' },
              { li: '유니클로 Pos 시스템  주문 연계' },
              { li: '주문 / 배송 / 정산 처리 프로세스 변경' }
            ]
          }
        ]
      }
    ]
  },
  year2018: {
    type: 'base',
    title: '2018',
    contents: [
      {
        id: '1',
        num: 'works_2018_01',
        pc: 'thehandsome/works_img.png',
        mo: 'thehandsome/works_img_mo.png',
        logo: 'thehandsome/works_logo.png',
        logo_mo: 'thehandsome/works_logo_mo.png',
        date: '2018',
        title: '더한섬닷컴 <br class="only_m">모바일 구축',
        txt: 'thehandsome.com 의 <br class="only_m"> mobile & App Renewal',
        content: [
          {
            list: [
              { li: 'PC 기반 쇼핑몰 환경을 모바일에 맞도록 최적화' },
              {
                li: '고객 편의성에 기여하는 신기술의 적극적인 반영 (바이오인증, 한섬페이, 개인화강화 등)'
              },
              { li: '모바일 매출 비중 확대' },
              { li: '앱 다운로드 증가, 타겟 마케팅 인프라 확대' },
              { li: 'Hybris Commerce Platform 기반' }
            ]
          }
        ]
      }
    ]
  },
  year2017: {
    type: 'base',
    title: '2017',
    contents: [
      {
        id: '1',
        num: 'works_2017_01',
        pc: 'civilpension/works_img.png',
        mo: 'civilpension/works_img_mo.png',
        logo: 'civilpension/works_logo.png',
        logo_mo: 'civilpension/works_logo_mo.png',
        date: '2017.08 ~ <span class="only_pc">2017.</span>11',
        title: `공무원연금공단
                <br>제휴복지몰`,
        txt: '제휴복지몰 구축',
        content: [
          {
            subTxt: 'Front',
            list: [
              { li: '메인 디자인 및 메뉴체계 개선' },
              { li: '반응형 시스템 구현(PC/Mobile)' },
              {
                li: 'PC,Mobile 기기별로 다른 컨텐츠를 노출할 수 있도록 구성'
              }
            ]
          },
          {
            subTxt: 'Admin',
            list: [
              { li: '제휴업체 및 제휴카드 매출실적관리 구축' },
              {
                li: '실시간으로 메뉴구조를 변경할 수 있도록  메뉴관리 기능 추가'
              },
              { li: '배너별 단가관리 기능 구축' }
            ]
          },
          {
            subTxt: '제휴업체 SSO 연동',
            list: [
              { li: '100여개의 제휴업체와 로그인 연동을 할 수 있도록 구현' },
              { li: '제휴업체의 개발언어에 따라 다른 연동모듈 제공' }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2017_02',
        pc: 'hyundaimall/works_img.png',
        mo: 'hyundaimall/works_img_mo.png',
        logo: 'hyundaimall/works_logo.png',
        date: '2017.03 ~ <span class="only_pc">2017.</span>11',
        title: '현대백화점<br>H&M Brand Mall',
        txt: 'H&M COS / &OtherStories 한국대표몰 구축',
        content: [
          {
            subTxt: 'Front',
            list: [
              {
                li: `Main/상품리스트/상품상세 및 기타 컨텐츠 페이지
                        <br class="only_t">Global Guide 적용`
              },
              { li: '반응형 시스템 구현(PC/Tablet/Mobile)' },
              {
                li: `회원, 주문/결제 및 마이페이지는 한국법 제도에 맞춰
                        <br class="only_t">로컬라이제이션 진행`
              }
            ]
          },
          {
            subTxt: 'Front 샵인샵',
            list: [
              {
                li: `더현대 사이트 내에서 Main/상품 리스트/상품상세 및
                        <br class="only_t">컨텐츠 페이지는 오피셜
                        <br class="only_pc">사이트와 동일한 Global Guide 적용`
              },
              { li: '회원, 주문, 마이페이지는 더현대닷컴 사용' }
            ]
          },
          {
            subTxt: 'Admin',
            list: [
              { li: '더현대닷컴 기존 Admin 기반으로 구축' },
              {
                li: `H&M 전용 Admin 구현
                          <br>* 상품관리, 재고관리, 프로모션관리, 매장관리, 전시관리,
                          <br class="only_t">기획전관리, 매거진관리, Sales Report 등`
              }
            ]
          },
          {
            subTxt: '물류 API 연동',
            list: [
              {
                li: `H&M Global 물류대행업체인 Li&Pung과 출고,회수,취소 및
                        <br class="only_t">재고 연동 구현`
              }
            ]
          }
        ]
      }
    ]
  },
  year2016: {
    type: 'base',
    title: '2016',
    contents: [
      {
        id: '1',
        num: 'works_2016_01',
        pc: 'k2/works_img.png',
        mo: 'k2/works_img_mo.png',
        logo: 'k2/works_logo.png',
        date: '2016.03 ~ <span class="only_pc">2016.</span>10',
        title: `K2 코리아 온라인
               <br>통합플랫폼`,
        txt: 'K2 Korea 5개 브랜드 커머스 통합 플랫폼 구축',
        content: [
          {
            subTxt:
              'K2, Eider, Salewa, 와이어앵글, 다이나핏 5개 Brand Commerce Mall 통합 Platform 구축',
            list: [
              { li: 'K2 Mall 구축' },
              { li: 'Eider Mall 구축' },
              { li: 'Salewa Mall 구축' },
              { li: '와이드앵글 Mall 구축' },
              { li: '다이나핏 Mall 구축' }
            ]
          },
          {
            subTxt: '프로젝트 범위',
            list: [
              { li: '서비스 전략 및 상세 서비스 기획' },
              { li: 'UI기획, 디자인' },
              { li: '시스템 개발 등 PC웹, 모바일웹 통합 수행' }
            ]
          },
          {
            // subTxt: 'Global Solution 구축 /운영 경험 보유(SAP Hybris)',
            list: [
              {
                li: 'Global Solution 구축 / 운영 경험 보유 <br class="only_m">(SAP Hybris)'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2016_02',
        pc: 'skmagic/works_img.png',
        mo: 'skmagic/works_img_mo.png',
        logo: 'skmagic/works_logo.png',
        date: '2016.03 ~ <span class="only_pc">2016.</span>10',
        title: `동양매직몰 구축
               <br>통합플랫폼`,
        txt: 'SK매직 Commerce Platform 구축',
        content: [
          {
            list: [
              { li: 'SK매직 대표 사이트로서 대 고객 통합 커뮤니케이션 채널' },
              { li: '다이렉트 렌탈 시대 도래에 대한 사전 준비' },
              { li: '렌탈 – 가전 Cross-Selling 기반 확보' },
              {
                li: '방문/구매 고객 분석을 통한 고객 반응 확인 및 고객 통찰 확보'
              },
              { li: '디지털 마케팅 Tool에 대한 사용 경험 축적' }
            ]
          }
        ]
      },
      {
        id: '3',
        num: 'works_2016_03',
        pc: 'livart/works_img.png',
        mo: 'livart/works_img_mo.png',
        logo: 'livart/works_logo.png',
        date: '2016.03 ~ 2016.10',
        title: '현대리바트 <br class="only_m">쇼핑몰 리뉴얼',
        txt: '현대리바트 <br class="only_m">쇼핑몰 리뉴얼',
        content: [
          {
            list: [
              {
                li: `리바트 Web, Mobile 쇼핑몰 리뉴얼 프로젝트 수행
                          <br>* UI/UX기획, 디자인, 퍼블리싱
                          <br>* 시스템 개발`
              },
              {
                li: `메인, GNB, QUICK MENU 개인화영역, 페이지 이동 FLOW 등,
                          <br class="only_pc">공통 UI/UX 개편으로 사용 편의성 강화`
              },
              {
                li: `카테고리 대/중/소/상품상세 UI/UX 변경으로 전시강화 및
                          <br class="only_pc">크로스&업셀링 지원`
              },
              {
                li: `몰인몰 입점상품/입점브랜드 및 생활소품 전시확대 및 관리기능
                          <br class="only_pc">신규개발로 리빙/인테리어 전문몰 기능 강화`
              },
              {
                li: `기획전/이벤트/반짝딜/패키지존/브랜드샵/베스트 리뷰 등
                          <br class="only_pc">서비스 메뉴 UI 개편`
              },
              {
                li: 'Admin 고도화를 통해 효율적인 운영을 위한 관리환경 개선'
              }
            ]
          }
        ]
      }
    ]
  },
  year2015: {
    type: 'base',
    title: '2015',
    contents: [
      {
        id: '1',
        num: 'works_2015_01',
        pc: 'samsungmulsan/works_img.png',
        mo: 'samsungmulsan/works_img_mo.png',
        logo: 'samsungmulsan/works_logo.png',
        logo_mo: 'samsungmulsan/works_logo_mo.png',
        date: '2015.10 ~ 2016.02',
        title: `삼성물산 패션부문
                 <br>SSFshop & Tmall연계`,
        txt: '삼성물산 SSFshop.com <br>Tmall 연계',
        content: [
          {
            list: [
              {
                li: `삼성물산 패션부문의 6개 브랜드가 중국 알리바바그룹이
                          <br class="only_pc">운영하는 티몰 글로벌에 입점`
              },
              {
                li: `티몰글로벌은 중국 알리바바가 전자상거래 분야의 글로벌 허브를
                          <br class="only_pc">구축하겠다는 전략아래 2015년 초 오픈한 글로벌 해외 직구 브랜드몰 플랫폼`
              },
              {
                li: '국제특송 업체와 인터페이스를 통해 주문에서 고객 수령까지 5일 이내 완료처리'
              },
              {
                li: '상품정보, 주문, 배송 정보를 SSFshop과 Tmall과 실시간인터페이스 처리'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2015_02',
        pc: 'kolon/works_img.png',
        mo: 'kolon/works_img_mo.png',
        logo: 'kolon/works_logo.png',
        date: '2015.10 ~ 2016.02',
        title: `코오롱 통합쇼핑몰
               <br>OCC 연계 구축 참여`,
        txt: '코오롱 통합쇼핑몰',
        content: [
          {
            list: [
              {
                li: `코오롱 브랜드 공식 쇼핑몰인 코오롱 몰과
                        <br class="only_t">코오롱 스포츠 공식 쇼핑몰 구축 참여`
              },
              {
                li: `코오롱 통합 쇼핑몰 백오피스와 화면을 연동하는
                        <br class="only_t">인터페이스 처리`
              },
              {
                li: `Adobe 웹 CMS 솔루션 툴을 사용하여
                        <br class="only_t">데이터 연동 처리`
              },
              {
                li: `솔루션 Tool 및 백오피스 데이터 처리에 대한
                        <br class="only_t">다방면의 경험 축적`
              }
            ]
          }
        ]
      },
      {
        id: '3',
        num: 'works_2015_03',
        pc: 'nongsim/works_img.png',
        mo: 'nongsim/works_img_mo.png',
        logo: 'nongsim/works_logo.png',
        logo_mo: 'nongsim/works_logo_mo.png',
        date: '2015.04 ~ <span class="only_pc">2015.</span>07 / 2015.08 ~ <span class="only_pc">2015.</span>10',
        title: `농심 메가마트 쇼핑몰
                <br>1,2단계 구축`,
        txt: '농심 메가마트 <br class="only_m">쇼핑몰 구축',
        content: [
          {
            list: [
              {
                li: `메가마트는 전국에 15개 점포를 보유한 대형마트이며,
                          <br class="only_pc">메가마트 온라인 쇼핑몰은 지역 마트 기반의 온라인 할인마트 시스템`
              },
              {
                li: `메가마트의 상품관리시스템에서 각 매장별 가격과 재고정보,
                          <br class="only_pc">이벤트 정보를 실시간 인터페이스 받음`
              },
              {
                li: `주문 정보는 매장 주문관리시스템으로 인터페이스 하여 매장에서
                          <br class="only_pc">Pickig -> Packing -> Shipping 처리`
              },
              { li: '주문 입력 시 배송 가능 시간을 고객이 직접 선택' },
              { li: 'SAP Hybris Commerce Platform으로 3개월만에 1단계 오픈' },
              { li: '2단계는 매장기반이 아닌 협력사 배송시스템 확대 구축' }
            ]
          }
        ]
      }
    ]
  },
  year2014: {
    type: 'base',
    title: '2014',
    contents: [
      {
        id: '1',
        num: 'works_2014_01',
        pc: 'imarket/works_img.png',
        mo: 'imarket/works_img_mo.png',
        logo: 'imarket/works_logo.png',
        date: '2014.02 ~ <span class="only_pc">2014.</span>10',
        title: `아이마켓코리아
                <br>B2B Mall`,
        txt: '아이마켓 <br class="only_m">B2B 쇼핑몰 구축',
        content: [
          {
            list: [
              {
                li: `기존 MRO서비스몰 아이마켓을 B2B, B2C 서비스 확대
                          <br>* 프로젝트 총괄 및 PM
                          <br>* 디자인 및 퍼블리싱`
              },
              {
                li: '시스템 개발 아이마켓 프로젝트의 전반적인 개발업무를 담당'
              },
              { li: '인터파크 쇼핑몰과 시스템 연동' },
              { li: '유지운영 효율성 강화를 위한 관리자 기능 구현' },
              { li: '기존 시스템 Data Migration 및 데이터 이행' },
              { li: '아이마켓을 위한 New Brand Identity 적용' }
            ]
          }
        ]
      },
      {
        id: '2',
        num: 'works_2014_02',
        pc: 'skinfood/works_img.png',
        mo: 'skinfood/works_img_mo.png',
        logo: 'skinfood/works_logo.png',
        logo_mo: 'skinfood/works_logo_mo.png',
        date: '2014.11 ~ 2015.05',
        title: `스킨푸드 쇼핑몰
                <br>구축 및 운영`,
        txt: `<span class="only_pc">스킨푸드 쇼핑몰 구축 (2014.11 -2015.05)
              <br>스킨푸드 쇼핑몰 운영 (2015.06 - 2015.12)</span><span class="only_M">스킨푸드 쇼핑몰 <br>구축 및 운영</span>`,
        content: [
          {
            list: [
              { li: '2014.11 ~ 2015.05 스킨푸드 쇼핑몰 구축' },
              { li: '2015.06 ~ 2015.12 스킨푸드 쇼핑몰 운영' },
              { li: '스킨푸드 웹 및 모바일 채널 리뉴얼 프로젝트 수행' },
              { li: '서비스 전략 및 상세 서비스 기획' },
              { li: 'UI기획, 디자인' },
              { li: '시스템 개발 등 PC웹, 모바일웹, 글로벌까지 통합 수행' },
              {
                li: '스킨푸드 모바일 멤버십 App 개발 <br class="only_m"> (Android, iOS)'
              },
              { li: '스킨푸드 쇼핑몰 유지운영 수행' },
              { li: '스킨푸드 브랜드 아이덴티티 구축' },
              {
                li: '스킨푸드 옴니채널 커머스 환경구축 <br class="only_m">(통합 멤버십 등)'
              },
              { li: '온라인 쇼핑몰 리뉴얼 이후 일평균 매출 20% 신장' },
              { li: '빅세일 이벤트 기간중 일평균 매출 400배 달성' }
            ]
          }
        ]
      },
      {
        id: '3',
        num: 'works_2014_03',
        pc: 'samsung_elec_member/works_img.png',
        mo: 'samsung_elec_member/works_img_mo.png',
        logo: 'samsung_elec_member/works_logo.png',
        date: '2014.02 ~ <span class="only_pc">2014.</span>10',
        title: ' 삼성전자 한국총괄 멤버십',
        txt: '삼성전자 <br class="only_m">블루멤버십 구축',
        content: [
          {
            list: [
              { li: '삼성전자 블루멤버십 사이트 구축에 따른' },
              { li: '서비스 전략 및 상세 서비스 기획' },
              { li: 'UI 기획, 디자인' },
              {
                li: '시스템 개발삼성전자 블루멤버십 프로젝트 전체 영역에 대한 기획, 디자인, 시스템개발 역할을 수행'
              },
              {
                li: `삼성전자 통합 멤버십 서비스 확대에 따른 CRM 시스템 개편과 더불어 사이트에서도
                          <br class="only_pc">새로운 고객서비스를 제공함으로써 CRM과 시스템 연계를 통해 프리미엄 고객서비스를 제공`
              },
              { li: '삼성전자 새로운 스타일가이드 적용' },
              { li: 'IDR Omni Portal Framework 적용' }
            ]
          }
        ]
      }
    ]
  },
  year2013: {
    type: 'base',
    title: '2013',
    contents: [
      {
        id: '1',
        num: 'works_2013_01',
        pc: 'samsung_elec_store/works_img.png',
        mo: 'samsung_elec_store/works_img_mo.png',
        logo: 'samsung_elec_store/works_logo.png',
        date: '2013',
        title: '삼성전자 <br>온라인스토어 멤버십',
        txt: '삼성전자 <br class="only_m"> Global e-Store 구축',
        content: [
          {
            list: [
              {
                li: '삼성전자 e-Store 쇼핑몰 구축 프로젝트에 참여 하였으며 세계적인 글로벌 쇼핑몰 솔루션인<br class="only_pc">SAP Hybris 커머스를 활용하여 쇼핑몰 시스템을 구축했습니다.<br>* 시스템 기획<br>* 서비스 개발 (주문, 배송, 고객센터) SAP Hybris 솔루션을 활용하여 주문,<br class="only_pc">배송, 고객센터 파트의 시스템 개발 역할을 수행했습니다.'
              }
            ]
          }
        ]
      }
    ]
  },
  year2012: {
    type: 'free_1',
    title: '2012',
    contents: [
      {
        id: '1',
        num: 'works_2012_01',
        pc: '',
        mo: '',
        logo: '',
        date: '',
        title: '',
        txt: '',
        content: [{}]
      }
    ]
  }
})
export default state
