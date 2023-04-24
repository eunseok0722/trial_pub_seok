window.onload = () => {

	// panel-faq-container
	const panelFaqContainer = document.querySelectorAll( '.panel-faq-container' );
	console.log( panelFaqContainer );  // NodeList 객체

	// panel-faq-answer
	let panelFaqAnswer = document.querySelectorAll( '.panel-faq-answer' );
	// console.log( panelFaqAnswer[i] );
	console.log( panelFaqAnswer );
	
	// btn-all-close
	const btnAllClose = document.getElementById( 'btn-all-close' );
	console.log( btnAllClose );
	
	// 반복문 순회하면서 해당 FAQ 제목 클릭시 콜백 처리
	for( let i=0; i < panelFaqContainer.length; i++ ) {
		panelFaqContainer[i].addEventListener( 'click', function() {
			// 클릭시 처리 할 일
			console.log( '나 클릭..' + i );
			
			// FAQ 제목 클릭시 --> 본문이 보이게끔 --> active 클래스 추가.
			// this.classList.add( 'active' );

			// panelFaqAnswer[i].classList.add( 'active' );
			panelFaqAnswer[i].classList.toggle( 'active' );

		} );
	}
	
	btnAllClose.addEventListener( 'click', function() {
		console.log( '모두 닫기 버튼 클릭..' );
		
		// 버튼 클릭시 처리할 일
		for( let i=0; i < panelFaqAnswer.length; i++ ) {
			panelFaqAnswer[i].classList.remove( 'active' );
		}
		
	} );
	
}














