const 책 = [
    {책이름: 'python 100제', 가격: 120, 출시일: '2025-03-29'},
    {책이름: '워케이션? 리케이션!', 가격: 150, 출시일: '2025-04-29'},
    {책이름: '알잘딱깔센 비동기 너 내 동기가 돼라', 가격: 300, 출시일: '2025-05-29'},
    {책이름: '알잘딱깔센 flex가 grid 어렵드나', 가격: 300, 출시일: '2025-06-29'},
    {책이름: '알잘딱깔센 TypeScript 핵심 개념', 가격: 100, 출시일: '2025-03-29'},
    {책이름: '알잘딱깔센 JavaScript 핵심 개념', 가격: 100, 출시일: '2025-04-29'},
    {책이름: '알잘딱깔센 GitHub 핵심 개념', 가격: 120, 출시일: '2025-05-29'},
    {책이름: 'PWA! <1만 시간의 법칙>!', 가격: 130, 출시일: '2025-06-29'}
];

const 책판매량 = [
    {책이름: 'python 100제', 판매량: 100},
    {책이름: '워케이션? 리케이션!', 판매량: 150},
    {책이름: '알잘딱깔센 비동기 너 내 동기가 돼라', 판매량: 100},
    {책이름: '알잘딱깔센 flex가 grid 어렵드나', 판매량: 120},
    {책이름: '알잘딱깔센 TypeScript 핵심 개념', 판매량: 120},
    {책이름: '알잘딱깔센 JavaScript 핵심 개념', 판매량: 140},
    {책이름: '알잘딱깔센 GitHub 핵심 개념', 판매량: 180},
    {책이름: 'PWA! <1만 시간의 법칙>!', 판매량: 190}
];
// openDatabase("Database 이름", "Database 버전", "Database 설명", "Database 크기");
const db = window.openDatabase('data', '1.0', 'data', 1*1024*1024);

// DROP
db.transaction(t => {
    t.executeSql('DROP TABLE 책정보');
    t.executeSql('DROP TABLE 판매정보');
}, e => console.error(e));

// CREATE, INSERT
db.transaction(t => {
    // table 생성
    t.executeSql('CREATE TABLE 책정보 (책이름 TEXT, 가격 INTEGER, 출시일 DATE)');
    t.executeSql('CREATE TABLE 판매정보 (책이름 TEXT, 판매량 INTEGER)');

    // 데이터 삽입
    for (let item of 책) {
        t.executeSql('INSERT INTO 책정보 (책이름, 가격, 출시일) VALUES (?, ?, ?)',
        [item.책이름, item.가격, item.출시일]);
    }

    for (let item of 책판매량) {
        t.executeSql('INSERT INTO 판매정보 (책이름, 판매량) VALUES (?, ?)', 
        [item.책이름, item.판매량]);
    }
}, e => console.error(e));

// SLELECT
db.transaction(t => {
    t.executeSql('SELECT * FROM 책정보', [], (t, result) => console.log(result.rows))
    t.executeSql('SELECT * FROM 판매정보', [], (t, result) => console.log(result.rows))
}, e => console.error(e));

// JOIN
db.transaction(t => {
    t.executeSql(
        'SELECT 책정보.책이름, SUM(책정보.가격 * 판매정보.판매량) FROM 책정보 INNER JOIN 판매정보 ON 책정보.책이름 = 판매정보.책이름 GROUP BY 1', [],
        (t, result) => console.log(result.rows)
    )
}, e => console.error(e));