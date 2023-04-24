// Template literals

// 줄바꿈을 할 경우 몹시 불편한 느낌이다.
var name = 'egoing';
var letter = 'Dear ' + name + '\n\nvituperatoribus adipiscing neque idque liber quis elementum. Qui libris varius maecenas tellus option porta amet. Omnesque varius salutatus mauris alterum fusce vix movet moderatius. Invidunt hac aliquet cras ' + name + ' mediocritatem curabitur principes. Graece nobis sem quem ligula atqui eu novum. Omittam luctus nominavi invenire congue oporteat inceptos ' + name + ' viderer natoque. Condimentum referrentur veritus sanctus nunc. Iisque ut neque animal ornate aliquet elit duo. Orci eum quot nulla graeco error. Non venenatis deterruisset ' + name + ' postulant oporteat.';
console.log(letter);

// Template literal
// Literal 이란? 정보를 표현하는 기호, 방법

var name = 'egoing';
var letter = `

Dear ${name}

vituperatoribus adipiscing neque idque liber quis elementum. Qui libris varius maecenas tellus option porta amet. Omnesque varius salutatus mauris alterum fusce vix movet moderatius. Invidunt hac aliquet cras ${name} mediocritatem curabitur principes. Graece nobis sem quem ligula atqui eu novum. Omittam luctus nominavi invenire congue oporteat inceptos ${name} viderer natoque. Condimentum referrentur veritus sanctus nunc. Iisque ut neque animal ornate aliquet elit duo. Orci eum quot nulla graeco error. Non venenatis deterruisset ${name} postulant oporteat.

`;
console.log(letter);
// 위와 같이 변수와 줄바꿈을 넣는 것이 자유롭다.

