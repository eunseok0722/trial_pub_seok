const state = () => ({
  txtDbService: {
    ecommerceMainT:
      '커머스 서비스의 기획, 디자인,<br class="only_m">개발 모든 역량을 보유한<br class="only_m"> 업계최고의 전문가 집합체.',
    ecommerceDescT:
      '(주)아이디알시스템은 커머스 서비스를 만들고 발전시키는데 필요한 모든 역량을 보유한 커머스 전문기업입니다.<br><br class="only_m">대형종합몰, 브랜드몰, 오픈 마켓플레이스 등 핵심 커머스 분야에 대한 풍부한 프로젝트 경험을 바탕으로 전문적이고 차별화된 커머스 구축 서비스를 제공합니다.<br><br class="only_m">온라인과 오프라인의 경계가 사라지고 하나로 만나는 지금의 변화 속에, 단순히 E-commerce가 아닌 진정한 온-오프라인 통합형 커머스 서비스를 실현합니다.',
    ecommerceList: [
      {
        label: 'IDR Omni Channel 방법론',
        tit: '옴니채널 전략을 수립하여 <br>서비스에 반영',
        con: 'IDR은 고유의 Omni Channel Strategic Planning 방법론을 개발하여 고객의 <span class="point_clr">옴니채널 전략 수립하는<br class="only_pc">서비스를 제공</span>하고 있습니다.'
      },
      {
        label: 'Omni  Commerce Pro',
        tit: '자체 솔루션 보유, <br>자체적 개발',
        con: 'IDR은 Global Solution외에도 중소규모의 쇼핑몰을 위한 <span class="point_clr">Omni-Channel Shopping Mall Solution을 자체적으로<br class="only_pc">개발하여 본격적으로 사업</span>을 진행하고 있습니다.'
      },
      {
        label: 'Omni Commerce Pro Architecture',
        tit: '빠른 개발력, <br>성능 향상을 높임.',
        con: 'Omni Commerce Pro는 최근 기술 기반 구조인 <span class="point_clr">MSA(Micro Service Architecture)를 적용하여 빠르게 <br class="only_pc">개발하고, 쇼핑몰 성능을 지속적으로 높여</span> 갈 수 있는 기술 구조로 개발하였습니다.'
      }
    ],
    curatorList: [
      {
        label: 'AI Marketing Curator - 개념',
        tit: '고객의 구매 전환률 극대화, <br>비용의 최소화 등 마케팅 <br class="only_pc">목적에 맞게 활용가능',
        con: 'AI Marketing Curator 인공 지능을 적용해 설계된 100여개 <br class="only_pc">Customer Cube를 전문가의 도움없이 <span class="point_clr">고객의 구매 전환률을 극대화하고, 비용의 최소화 등 마케팅 목적에 맞게 캠페인</span>을 <br class="only_pc">실행할 수 있는 솔루션입니다.',
        dotList: [
          {
            li: '고객의 기본적인 정보를 바탕으로 통계가공     >    AI모델링을 통해  선호도분석     >     고객의 활동특성을 파악 후 이벤트 및 마케팅적용'
          }
        ]
      },
      {
        label: 'AI Marketing Curator – 최신 모델링 방법 적용',
        tit: '최신의 AI 적용기법 <br>및 모델링 방법을 적용',
        con: '패션 산업에 최적화된 고객 통합 정보 체계를 설계하기 위해 <span class="point_clr">최신의 AI 적용기법 및 모델링 방법을 적용</span>하였습니다.',
        dotList: [
          {
            li: '<span class="only_pc">AI 기술구분영역 - Client2vec, AI/ML모델링, Image Classifier</span><div class="only_m"><span class="fwEB">AI 기술구분영역</span> <span class="point_label">Client2vec</span><span class="point_label">AI/ML모델링</span><span class="point_label">Image Classifier</span></div>'
          },
          {
            c: 'no_dot',
            li: '<div class="only_pc"><span class="point_label">AI 기술력으로 고객의 구매 주기와 선호 브랜드, 선호 상품 가격을 예측한 데이터를 적극적으로 활용하여 구매력을 높일 수 있습니다.</span></div><span class="only_m">AI 기술력으로 고객의 구매 주기와 선호 브랜드, 선호 상품 가격을 예측한 데이터를 적극적으로 활용하여 구매력을 높일 수 있습니다.</span>'
          }
        ]
      }
    ],
    designList: [
      {
        label: 'UX/UI ?',
        tit: 'UI 유저 인터페이스',
        con: 'UX, UI의 상호관계가 가장 극명하게 드러나는 것으로 <span class="point_clr">웹과 앱의 최적화된 환경을 IDR 디자인 및 기획전문가</span>들이<br class="only_pc"> 유저의 편리성에 맞게 진행해드립니다.<br> <div class="only_pc"><span class="point_label">UX 디자인의 프로세스 단계 : 1.이해  2.공감  3.아이디어   4.프로토타입  5.테스트   6.출시&측정</span></div><div class="only_m"><ul class="dot_ul"><li><span class="fwEB">UX 디자인의 프로세스 단계 </span><div>이해 > 공감 > 아이디어 > 프로토타입 > 테스트 > 출시&측정</div></li></ul></div>'
      },
      {
        label: 'UX/UI Design',
        tit: '유저들의 패턴분석,<br>가독성과 편리함을 제공',
        con:
          '사용자들의 경험과 서비스를 불편함없이 설계하고\n' +
          '            <span class="point_clr">유저의 경험인 UX에 기반을 두어 설계 디자인을 진행</span>하는 <br class="only_pc">디자인전문가들로 구성되어 있습니다. 크리에이티브한 디자인은 많은 사용자들에게 확장될 수 있는 <br class="only_pc">쉽고 안정적인 UX환경을 만들어 냅니다.\n' +
          '            <ul class="dot_ul"><li><dl class="line_sep_dl"><dt>\n' +
          '                    UX 디자인 5가지\n' +
          '                  </dt> <dd><ul><li>1. 웹사이트는 모바일 친화적이어야 한다.</li><li>2. 유저 스스로가 만들기를 우선시할 수 있어야한다.</li><li>3. 유저의 경험이 전부다.</li><li>4. 나의 연락처 페이지 만들기</li><li>5. 일대일 연결 만들기</li></ul></dd></dl></li></ul>'
      }
    ]
  }
})
export default state
