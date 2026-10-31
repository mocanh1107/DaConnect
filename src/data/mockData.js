// ============================================
// DaConnect Mock Data
// ============================================

export const CURRENT_USER = {
  id: 'u1',
  name: 'Nguyễn Minh Khoa',
  username: 'minhkhoa.da',
  initials: 'MK',
  reputation: 1240,
  xp: 3850,
  streak: 7,
  rank: 'Silver II',
  joinDate: '2024-03-15',
};

// ── Community Articles ──────────────────────────
export const ARTICLES = [
  {
    id: 'art-anthropic-35',
    category: 'Tin tức AI',
    isHot: true,
    gradient: 'linear-gradient(135deg, #0B1533 0%, #0284C7 100%)',
    title: 'Anthropic công bố Claude 3.5 Sonnet & Haiku: Cuộc cách mạng Computer Use và Bước chuyển dịch sang AI Agent Tự hành',
    excerpt: 'Anthropic vừa chính thức ra mắt phiên bản nâng cấp của Claude 3.5 Sonnet cùng khả năng "Computer Use" mang tính đột phá. Giới chuyên môn đánh giá đây là cột mốc biến trí tuệ nhân tạo từ một chatbot biết trả lời câu hỏi thành một cộng sự tự điều khiển phần mềm, thay đổi toàn diện quy trình làm việc của dân phân tích dữ liệu.',
    author: 'Nguyễn Hoàng Long – Chuyên gia Phân tích AI & Dữ liệu',
    authorInitials: 'HL',
    source: 'TechCrunch & AI Frontiers',
    readTime: '9 phút đọc',
    date: 'Hôm nay, 15:20',
    tags: ['Anthropic', 'Claude 3.5', 'AI Agent', 'Computer Use', 'Tự động hóa'],
    views: 5420,
    likes: 418,
    content: `
## Cột mốc lịch sử: Khi AI học cách tự điều khiển máy tính

Trong ngành trí tuệ nhân tạo, ranh giới giữa một mô hình ngôn ngữ lớn (LLM) và một **AI Agent (Đặc nhân trí tuệ tự hành)** luôn nằm ở khả năng tương tác với thế giới thực. Suốt 2 năm qua, người dùng đã quen với việc copy văn bản, dán vào cửa sổ chat của ChatGPT hay Claude, nhận câu trả lời rồi lại copy ngược trở lại phần mềm làm việc.

Sự kiện Anthropic công bố tính năng **"Computer Use" (Điều khiển máy tính)** đi kèm phiên bản nâng cấp của Claude 3.5 Sonnet và Claude 3.5 Haiku đã chính thức phá bỏ rào cản này. Lần đầu tiên, một mô hình AI thương mại có thể tự nhìn màn hình, di chuyển con trỏ chuột, nhấp vào các nút bấm, điền biểu mẫu và chuyển đổi linh hoạt giữa nhiều phần mềm máy tính như một nhân viên kỹ thuật thực thụ.

### 1. Benchmark SWE-bench và bước nhảy vọt về năng lực suy luận

Trước khi đi sâu vào tính năng điều khiển máy tính, cần nhìn vào những con số ấn tượng mà Claude 3.5 Sonnet vừa thiết lập trên bảng xếp hạng học thuật:

- **SWE-bench Verified**: Claude 3.5 Sonnet đạt tỷ lệ giải quyết vấn đề thực tế lên đến **49.0%**, bỏ xa các đối thủ sừng sỏ nhất như GPT-4o (34.2%) hay Gemini 1.5 Pro. Đây là bài test đánh giá khả năng đọc hiểu kho mã nguồn khổng lồ, tìm lỗi sai và tự động viết bản vá sửa lỗi hoàn chỉnh.
- **Cửa sổ ngữ cảnh 200,000 tokens**: Tương đương với khoảng 500 trang tài liệu hoặc một cơ sở dữ liệu bán hàng cả quý. Khả năng ghi nhớ và đối chiếu chéo thông tin của mô hình đạt độ chuẩn xác gần như tuyệt đối, giúp loại bỏ hiện tượng "ảo giác" (hallucination) thường gặp khi xử lý số liệu lớn.
- **Tối ưu hóa kinh tế với Claude 3.5 Haiku**: Mô hình giá rẻ Haiku thế hệ mới có tốc độ phản hồi nhanh gấp 3 lần nhưng mang lại độ chính xác ngang ngửa Sonnet đời đầu, mở ra cơ hội triển khai tự động hóa quy mô lớn với chi phí chỉ bằng một phần nhỏ so với trước đây.

### 2. "Computer Use" hoạt động như thế nào dưới góc độ kỹ thuật?

Thay vì phụ thuộc vào các giao diện lập trình ứng dụng (API) riêng biệt vốn đòi hỏi nhà phát triển phải tích hợp thủ công cho từng phần mềm, Anthropic đã huấn luyện Claude hiểu thế giới máy tính theo đúng cách con người tiếp cận:

1. **Nhận thức thị giác (Screen Perception)**: Claude chụp ảnh màn hình máy tính theo thời gian thực, sử dụng thị giác máy tính để phân tích tọa độ các ô nhập liệu, bảng tính, icon thanh công cụ và văn bản hiển thị.
2. **Lập kế hoạch đa bước (Multi-step Reasoning)**: Khi nhận yêu cầu *"Hãy đối chiếu doanh thu trên hệ thống ERP với file báo cáo Excel của phòng tài chính"*, mô hình tự chia nhỏ thành 15 bước hành động cụ thể.
3. **Thực thi hành động vật lý (Action Execution)**: Gửi lệnh di chuyển chuột đến tọa độ chính xác, bấm chuột trái để mở file, bấm tổ hợp phím tải dữ liệu và thao tác trực tiếp trên phần mềm chuyên dụng như Tableau, Power BI hay DBeaver.

### 3. Tác động sâu sắc đến ngành Dữ liệu (Data Analytics & Engineering)

Sự ra đời của Computer Use đánh dấu bước chuyển đổi căn bản trong công việc hàng ngày của người làm Data:

- **Xóa bỏ các công việc chân tay lặp lại**: Những tác vụ như tải file CSV từ cổng thông tin đối tác mỗi sáng, lọc bỏ các dòng trùng lặp, dán vào bảng tổng hợp và gửi email cho sếp sẽ được giao phó hoàn toàn cho AI Agent tự động chạy ngầm.
- **Từ "Người viết truy vấn" sang "Kiến trúc sư kiểm soát"**: Các Data Analyst không còn phải tốn hàng giờ tra cứu cú pháp nối bảng hay hàm xử lý chuỗi. Thay vào đó, họ đóng vai trò kiểm soát viên: xác định xem bài toán kinh doanh nào cần giải quyết, định hình nguồn dữ liệu đầu vào và thẩm định tính logic của kết quả đầu ra.
- **Kiểm thử chất lượng dữ liệu tự động (Automated Data Quality Assurance)**: Claude 3.5 có thể tự động chạy các kịch bản kiểm tra bất thường (Anomaly Detection), phát hiện doanh thu chi nhánh bị tụt giảm đột biến và tự mở hệ thống kho vận để tìm nguyên nhân gốc rễ.

### 4. Thách thức về an toàn và rào cản phía trước

Dù mang lại tiềm năng khổng lồ, các nhà nghiên cứu tại Anthropic cũng đưa ra cảnh báo thận trọng:

> *"Khi trao quyền cho AI điều khiển chuột và bàn phím, nguy cơ bị tấn công qua kỹ thuật Prompt Injection ẩn trong hình ảnh hoặc trang web độc hại là hoàn toàn có thật. Chúng tôi khuyến cáo các tổ chức tài chính và y tế hiện tại chỉ nên ứng dụng Computer Use trong môi trường có sự giám sát của con người (Human-in-the-loop)."*

Ngoài ra, tốc độ thao tác chuột của AI hiện tại vẫn còn độ trễ nhất định so với một kỹ sư thao tác bằng phím tắt. Tuy nhiên, với tốc độ cải tiến hiện nay, giới phân tích tại Phố Wall dự báo đến cuối năm 2025, các AI Agent điều khiển máy tính sẽ đạt tốc độ tương đương hoặc nhanh hơn người dùng thông thường, mở ra làn sóng tăng năng suất lao động tri thức lớn nhất trong lịch sử công nghệ.
    `,
  },
  {
    id: 'art-sam-altman',
    category: 'Phỏng vấn & Góc nhìn',
    isHot: true,
    gradient: 'linear-gradient(135deg, #1A2744 0%, #2563EB 100%)',
    title: 'Sam Altman nói về tình hình AI hiện nay, lộ trình AGI và tương lai của lực lượng lao động tri thức',
    excerpt: 'Tại buổi tọa đàm chuyên sâu tại San Francisco và bài luận "The Intelligence Age", CEO OpenAI Sam Altman đã phác thảo bức tranh toàn cảnh về cuộc đua AGI, sự sụt giảm 10 lần mỗi năm của chi phí suy luận và lý do vì sao người làm dữ liệu không nên sợ hãi trước làn sóng tự động hóa.',
    author: 'Đặng Minh Quân – Tổng hợp từ MIT Tech Review',
    authorInitials: 'MQ',
    source: 'MIT Technology Review & Bloomberg',
    readTime: '11 phút đọc',
    date: 'Hôm qua, 18:45',
    tags: ['Sam Altman', 'OpenAI', 'AGI', 'Kỷ nguyên Trí tuệ', 'Tương lai việc làm'],
    views: 6850,
    likes: 512,
    content: `
## Toàn cảnh kỷ nguyên trí tuệ qua lăng kính của Sam Altman

Sau đúng 2 năm kể từ ngày phát hành ChatGPT – sản phẩm công nghệ tiêu dùng phát triển nhanh nhất lịch sử nhân loại – **Sam Altman (CEO OpenAI)** đã có những chia sẻ thẳng thắn và toàn diện nhất về thực trạng cũng như tương lai của ngành trí tuệ nhân tạo.

Tại buổi tọa đàm kín cùng các nhà khoa học và nhà đầu tư tại San Francisco, kết hợp cùng bài luận gây chú ý mang tên *"The Intelligence Age"* (Kỷ nguyên Trí tuệ) trên blog cá nhân, Altman đã đưa ra những nhận định mang tính định hình cho toàn bộ lực lượng lao động tri thức toàn cầu.

### 1. "AGI không phải là một cú nổ bất ngờ, mà là một sườn dốc liên tục"

Một trong những hiểu lầm phổ biến nhất của công chúng về AGI (Trí tuệ Nhân tạo Tổng quát) là niềm tin rằng một ngày nào đó, các nhà khoa học sẽ "bật công tắc" và một thực thể siêu trí tuệ thức tỉnh, làm đảo lộn thế giới sau một đêm.

Sam Altman bác bỏ viễn cảnh viễn tưởng này:

> *"Thực tế diễn ra không phải như một cú nổ nhị phân 0-1, mà là một sườn dốc dốc đứng mà nhân loại đang leo lên từng ngày. Mỗi phiên bản mô hình mới ra đời – từ GPT-3.5, GPT-4, dòng mô hình suy luận o1 (Strawberry) cho đến thế hệ tiếp theo – đều dần đảm nhận thêm 15% đến 20% các tác vụ nhận thức phức tạp của con người. Đến khi chúng ta chính thức công nhận một hệ thống đạt chuẩn AGI, xã hội thực chất đã quen với việc sống và làm việc cùng nó từ nhiều năm trước đó."*

### 2. Năm nấc thang tiến hóa của Trí tuệ Nhân tạo theo chuẩn OpenAI

OpenAI hiện phân loại lộ trình phát triển AI thành 5 cấp độ rõ rệt:

1. **Cấp độ 1 – Chatbots**: Khả năng giao tiếp ngôn ngữ tự nhiên (ChatGPT thời kỳ đầu, GPT-3.5).
2. **Cấp độ 2 – Reasoners (Mô hình suy luận)**: Khả năng tư duy logic sâu, suy nghĩ từng bước trước khi trả lời, giải quyết các bài toán toán học và logic phức tạp ngang tầm tiến sĩ (Dòng mô hình OpenAI o1).
3. **Cấp độ 3 – Agents (Đặc nhân tự hành)**: Các hệ thống có khả năng tự lập kế hoạch và thực hiện chuỗi hành động kéo dài nhiều ngày trên máy tính mà không cần con người can thiệp từng bước (Mục tiêu trọng tâm của năm 2025).
4. **Cấp độ 4 – Innovators (Nhà phát minh)**: Các mô hình có khả năng hỗ trợ con người khám phá tri thức khoa học mới, tìm ra công thức thuốc chữa bệnh hoặc phát minh thuật toán mới.
5. **Cấp độ 5 – Organizations**: Các hệ thống AI có khả năng tự điều phối và vận hành toàn bộ một tổ chức hoặc bộ phận kinh doanh độc lập.

Theo Altman, thế giới công nghệ hiện đang ở giai đoạn giao thời bản lề giữa **Cấp độ 2 (Reasoners)** và **Cấp độ 3 (Agents)**.

### 3. Kinh tế học AI: Định luật Moore mới về chi phí suy luận

Một thông điệp quan trọng mà Altman gửi đến các nhà lãnh đạo doanh nghiệp là định luật kinh tế mới của AI: **Chi phí để tính toán một đơn vị trí tuệ (Inference Cost) đang giảm khoảng 10 lần sau mỗi 12 tháng.**

Điều này có ý nghĩa gì đối với nền kinh tế?
- Hai năm trước, việc đọc hiểu và phân tích tự động toàn bộ 100,000 giao dịch bán hàng của một tập đoàn bán lẻ tốn hàng chục USD chi phí API.
- Hiện nay, con số đó chỉ còn vài xu.
- Trong tương lai gần, chi phí để chạy hàng nghìn kịch bản mô phỏng kinh doanh, dự báo doanh thu và phân khúc khách hàng sẽ rẻ đến mức gần như tiệm cận 0. Khi trí tuệ trở nên dồi dào và siêu rẻ, giá trị sẽ chuyển dịch từ việc "sở hữu khả năng tính toán" sang việc "biết đặt câu hỏi nào thực sự mang lại giá trị cho xã hội".

### 4. Lời khuyên cho nhân sự ngành Dữ liệu và Kỹ thuật

Khi đối mặt với câu hỏi trực diện: *"Liệu các bạn trẻ học Data Analyst, Data Scientist và Kỹ sư phần mềm có nên chuyển ngành hay không?"*, Sam Altman đã đưa ra 3 lời khuyên sâu sắc:

- **Đừng cố gắng đua tốc độ với AI về mặt cú pháp**: Nếu bạn tự hào vì thuộc lòng cú pháp viết câu lệnh SQL phức tạp hay nhớ từng tham số của thư viện Scikit-learn, bạn đang đặt cược vào một kỹ năng sẽ bị AI hạ giá trị rất nhanh. AI có thể viết code chuẩn xác trong 2 giây mà không bao giờ gặp lỗi chính tả.
- **Kỹ năng quý giá nhất là "Problem Formulation" (Khả năng định hình bài toán)**: AI chỉ có thể giải quyết bài toán khi con người mô tả rõ ràng bài toán đó là gì. Khả năng nhìn vào một doanh nghiệp đang thua lỗ, nhận diện nguyên nhân cốt lõi nằm ở khâu quản trị tồn kho hay trải nghiệm khách hàng, và chuyển hóa nó thành đề bài dữ liệu – đó là năng lực con người độc quyền.
- **Tư duy của một "AI-Empowered Builder"**: Những người thành công vượt bậc trong thập kỷ tới không phải là người từ chối AI, cũng không phải người phụ thuộc thụ động vào nó, mà là những cá nhân biết dùng AI như một đòn bẩy nhân lực gấp 10 lần năng suất của chính mình.
    `,
  },
  {
    id: 'art-netflix-data',
    category: 'Case Study công nghệ',
    isHot: false,
    gradient: 'linear-gradient(135deg, #0B1533 0%, #E50914 100%)',
    title: 'Case Study: Netflix đã tận dụng Data Science và Machine Learning như thế nào để phục vụ 270 triệu thuê bao?',
    excerpt: 'Khám phá hậu trường kỹ thuật của Netflix: từ giải thưởng Netflix Prize lịch sử, thuật toán cá nhân hoá hình ảnh đại diện (Artwork Personalization), cơ chế Multi-Armed Bandit cho đến văn hóa A/B Testing khắt khe đứng sau thành công của đế chế streaming số 1 thế giới.',
    author: 'Lê Thanh Bình – Cựu Kỹ sư Dữ liệu tại Silicon Valley',
    authorInitials: 'TB',
    source: 'Netflix Technology Blog & HBR Case Studies',
    readTime: '13 phút đọc',
    date: '2 ngày trước',
    tags: ['Netflix', 'Data Science', 'Machine Learning', 'Cá nhân hóa', 'Case Study'],
    views: 7120,
    likes: 546,
    content: `
## Đằng sau cỗ máy giữ chân người dùng trị giá hàng tỷ USD của Netflix

Khi bạn đăng nhập vào Netflix tại Việt Nam, bức ảnh thumbnail (ảnh bìa đại diện) của bộ phim kinh điển *"Good Will Hunting"* hay series bom tấn *"Stranger Things"* mà bạn nhìn thấy rất có thể **hoàn toàn khác biệt** so với bức ảnh hiển thị trên tài khoản của người thân hay bạn bè của bạn.

Đằng sau chi tiết tưởng chừng nhỏ bé đó là một trong những hệ thống khoa học dữ liệu và học máy phức tạp nhất từng được nhân loại xây dựng. Với hơn 270 triệu thuê bao trả phí trên khắp thế giới và hàng trăm nghìn đầu phim trong thư viện số, Netflix đã chứng minh rằng: **Trong kỷ nguyên số, dữ liệu chính là trải nghiệm người dùng.**

### 1. Từ giải thưởng Netflix Prize đến Cuộc chiến 1.8 giây

Năm 2006, Netflix đã tạo nên một cơn địa chấn trong giới học thuật khi công bố giải thưởng **Netflix Prize** trị giá 1 triệu USD cho bất kỳ nhóm nghiên cứu nào có thể cải thiện độ chính xác của thuật toán gợi ý phim (Cinematch) lên thêm 10%. Sau 3 năm tranh tài quyết liệt, đội ngũ chiến thắng đã kết hợp hàng trăm mô hình ma trận phân tích (Matrix Factorization) để nhận giải thưởng.

Tuy nhiên, khi Netflix chuyển mình từ dịch vụ cho thuê đĩa DVD qua bưu điện sang nền tảng phát trực tuyến (Streaming), một bài toán hoàn toàn mới xuất hiện: **Sự kiên nhẫn của con người giảm sút nghiêm trọng.**

Nghiên cứu hành vi người dùng của đội ngũ Data Science tại Netflix đã chỉ ra một chỉ số giật mình:
- Một người dùng trung bình chỉ dành khoảng **1.8 giây** để lướt qua một tiêu đề phim trên màn hình tivi hoặc điện thoại.
- Nếu không tìm thấy bất kỳ điều gì hấp dẫn trong vòng **90 giây**, người dùng sẽ tắt ứng dụng và chuyển sang nền tảng khác như YouTube hoặc TikTok.
- Và yếu tố quan trọng nhất quyết định một người có dừng lại bấm xem hay không chính là: **Bức ảnh đại diện (Artwork Thumbnail), chiếm hơn 82% tác động vào quyết định thị giác.**

### 2. Thuật toán Dynamic Artwork Personalization: Cá nhân hóa từng khung hình

Trước đây, các hãng phim thường chỉ thiết kế 1 đến 2 poster chính thức để quảng bá tác phẩm. Nhưng với Netflix, một bộ phim có thể có tới 20 đến 30 biến thể hình ảnh khác nhau, mỗi bức ảnh nhấn mạnh vào một khía cạnh cảm xúc, thể loại hoặc diễn viên cụ thể.

Hệ thống Data Science của Netflix tự động phân tích hành vi lịch sử xem phim của từng cá nhân để lựa chọn hình ảnh tối ưu:

- **Khán giả yêu thích dòng phim lãng mạn**: Khi bộ phim *"Good Will Hunting"* được đề xuất, poster hiển thị sẽ là cảnh Matt Damon và Minnie Driver đang ôm nhau tình cảm trong công viên.
- **Khán giả yêu thích phim hài**: Vẫn là bộ phim đó, nhưng hệ thống sẽ tự động hiển thị poster chụp cận cảnh nụ cười hóm hỉnh của danh hài quá cố Robin Williams.
- **Khán giả hâm mộ một diễn viên cụ thể**: Nếu bạn đã từng xem hết tất cả các phim có Uma Thurman đóng, khi phim *"Pulp Fiction"* xuất hiện trên trang chủ, poster bạn thấy chắc chắn sẽ là ảnh Uma Thurman nằm trên giường hút thuốc, thay vì ảnh của John Travolta hay Samuel L. Jackson.

### 3. Bí mật đằng sau phương pháp Contextual Multi-Armed Bandits

Để giải quyết bài toán hiển thị poster nào cho ai mà không làm ảnh hưởng đến trải nghiệm của người dùng, Netflix không thể dùng phương pháp thử nghiệm A/B Testing truyền thống vì quá chậm và gây lãng phí tương tác. Thay vào đó, họ áp dụng một giải thuật nâng cao thuộc nhánh Học tăng cường (Reinforcement Learning) mang tên **Contextual Multi-Armed Bandits**.

Thuật toán này giải quyết hoàn hảo bài toán tiến thoái lưỡng nan kinh điển trong kinh doanh: **Thăm dò (Exploration) và Khai thác (Exploitation):**

1. **Giai đoạn Thăm dò (Exploration)**: Thuật toán dành một tỷ lệ nhỏ lượt hiển thị để thử nghiệm các bức poster mới cho các nhóm khán giả khác nhau, nhằm phát hiện xem bức ảnh nào đang tạo ra sự tò mò cao nhất.
2. **Giai đoạn Khai thác (Exploitation)**: Ngay khi phát hiện một bức poster có tỷ lệ nhấp chuột và thời gian xem thực tế vượt trội đối với một nhóm người dùng cụ thể, hệ thống sẽ lập tức tăng tần suất hiển thị bức ảnh đó cho toàn bộ phân khúc tương đồng.

Bằng cách liên tục cập nhật theo thời gian thực dựa trên phản hồi của hàng triệu lượt click mỗi phút, Netflix tối đa hóa tỷ lệ chuyển đổi mà không cần con người can thiệp cấu hình thủ công.

### 4. Văn hóa A/B Testing khắt khe: Không bao giờ tin vào trực giác cá nhân

Tại trụ sở Los Gatos của Netflix, một tôn chỉ luôn được nhắc lại cho mọi kỹ sư và chuyên viên phân tích: *"Ý kiến của CEO cũng chỉ là một giả thuyết cần được kiểm chứng bằng dữ liệu."*

- **Quy mô thử nghiệm khổng lồ**: Tại bất kỳ thời điểm nào, Netflix cũng đang vận hành đồng thời hàng nghìn thử nghiệm A/B trên toàn cầu. Một người dùng đăng nhập có thể đang tham gia vào 30 bài test khác nhau: từ kích thước nút bấm, màu sắc thanh tiến trình, thuật toán nén video cho đến logic sắp xếp thứ tự các hàng phim.
- **Hệ thống Guardrail Metrics (Chỉ số cảnh báo rào chắn)**: Khi tối ưu hóa một chỉ số ngắn hạn như tỷ lệ click (CTR), Netflix luôn cài đặt các chỉ số giám sát dài hạn. Nếu một bức poster tạo ra nhiều lượt click (clickbait) nhưng người xem tắt phim chỉ sau 2 phút, thuật toán sẽ tự động chấm điểm phạt bức ảnh đó vì gây hại cho chỉ số gắn kết lâu dài (Long-term Retention).

### 5. Bài học thực tiễn cho các doanh nghiệp số tại Việt Nam

Sự thành công của cỗ máy dữ liệu Netflix mang đến 3 bài học đắt giá cho các sàn thương mại điện tử (Shopee, Tiki), siêu ứng dụng (MoMo, Grab) và dịch vụ truyền thông tại Việt Nam:

- **Cá nhân hóa không chỉ dừng ở việc "Gợi ý đúng sản phẩm", mà phải là "Trình bày sản phẩm đúng cách"**: Cùng một món hàng, mỗi khách hàng bị thuyết phục bởi những góc nhìn khác nhau (giá rẻ, thương hiệu uy tín, hay thiết kế thời trang).
- **Thử nghiệm liên tục là chìa khóa của tăng trưởng**: Đừng tranh luận trong phòng họp xem tính năng nào tốt hơn; hãy xây dựng hạ tầng thử nghiệm A/B Test để khách hàng bỏ phiếu bằng hành vi thực tế.
- **Đầu tư vào chất lượng dữ liệu sạch từ gốc**: Các mô hình Machine Learning tinh vi nhất thế giới cũng sẽ thất bại nếu dữ liệu hành vi của người dùng bị phân mảnh, thiếu sót hoặc đo lường sai lệch.
    `,
  },
  {
    id: 'art-data-ai-era',
    category: 'Xu hướng ngành Data',
    isHot: false,
    gradient: 'linear-gradient(135deg, #0B1533 0%, #10B981 100%)',
    title: 'Ngành Data trong thời đại Generative AI: Liệu Data Analyst và Data Scientist có bị thay thế?',
    excerpt: 'Khảo sát trên 800 giám đốc công nghệ toàn cầu hé lộ sự chuyển dịch lịch sử của thị trường lao động ngành Dữ liệu: Sự thoái trào của các vị trí làm báo cáo tĩnh truyền thống và sự bùng nổ của thế hệ Analytics Engineer biết kết hợp AI để gia tăng năng suất gấp bội.',
    author: 'Trần Ngọc Bảo Trâm – Chuyên gia Chiến lược Tuyển dụng Công nghệ',
    authorInitials: 'BT',
    source: 'Gartner Research & Tech In Asia',
    readTime: '10 phút đọc',
    date: '3 ngày trước',
    tags: ['Xu hướng', 'Thị trường việc làm', 'Data Analyst', 'Định hướng sự nghiệp', 'AI Era'],
    views: 4920,
    likes: 389,
    content: `
## Khi AI biết viết SQL và vẽ biểu đồ, con người sẽ làm gì?

Trong suốt 18 tháng qua, câu hỏi xuất hiện nhiều nhất trong các diễn đàn nghề nghiệp và các buổi phỏng vấn tuyển dụng là: *"Liệu việc học SQL, Python và Power BI có còn tương lai khi chỉ cần một câu lệnh prompt ngắn trên ChatGPT hay Claude là đã có thể xuất ra toàn bộ bảng biểu và biểu đồ phân tích?"*

Báo cáo khảo sát toàn cảnh thị trường lao động công nghệ quý 3/2024 của **Gartner** phối hợp cùng **LinkedIn Economic Graph** đã đưa ra câu trả lời rõ ràng: **Nhu cầu tuyển dụng nhân sự dữ liệu không hề biến mất, nhưng định nghĩa về một "chuyên viên phân tích dữ liệu giỏi" đã bị đảo lộn hoàn toàn.**

### 1. Bức tranh thị trường: Những công việc đang dần thoái trào

Các doanh nghiệp không còn sẵn sàng chi trả mức lương nghìn đô cho những nhân sự chỉ thực hiện các công việc cơ bắp mang tính kỹ thuật lặp lại:

- **Thợ kéo dữ liệu và xuất báo cáo định kỳ (SQL Query Monkey)**: Việc nhận yêu cầu từ phòng kinh doanh, ngồi viết câu lệnh JOIN vài bảng để xuất file Excel gửi qua email hiện nay các công cụ Text-to-SQL và AI Agent thực hiện chỉ trong 5 giây với độ chuẩn xác tuyệt đối.
- **Làm sạch số liệu thủ công**: Những kỹ năng như căn chỉnh cột, sửa lỗi định dạng ngày tháng hay dùng hàm VLOOKUP ghép bảng trong Excel đang bị các công cụ tự động hóa nuốt chửng.
- **Vẽ các Dashboard tĩnh chỉ để nhìn lại quá khứ**: Ban lãnh đạo doanh nghiệp ngày nay không còn hào hứng với các dashboard hàng chục biểu đồ rối mắt chỉ để trả lời câu hỏi *"Doanh thu tháng trước là bao nhiêu?"*. Họ cần các câu trả lời trực tiếp: *"Tại sao doanh thu giảm và tuần này cần hành động gì để khắc phục?"*.

### 2. Sự trỗi dậy của các vị trí mới với mức đãi ngộ cao kỷ lục

Trong khi các vị trí Data Analyst truyền thống chứng kiến sự chững lại về mức lương, các vị trí kết hợp giữa **Dữ liệu + Tư duy sản phẩm + Năng lực AI** đang chứng kiến mức lương tăng trưởng trung bình **28% so với cùng kỳ năm trước**:

| Vị trí mới nổi | Trọng tâm công việc | Năng lực cốt lõi |
| :--- | :--- | :--- |
| **Analytics Engineer** | Xây dựng hạ tầng dữ liệu ngữ nghĩa (Semantic Layer), chuẩn hóa mô hình dữ liệu bằng dbt để AI và con người cùng hiểu một ngôn ngữ kinh doanh chung. | SQL nâng cao, dbt, Data Modeling, Git, Data Governance |
| **Decision Intelligence Scientist** | Thiết kế các bài toán thực nghiệm A/B Test, mô hình hóa các quyết định kinh doanh phức tạp và định lượng rủi ro tài chính. | Kinh tế lượng, Thống kê suy luận, Causal Inference, Tư duy kinh doanh |
| **AI Data Curator / LLMOps Specialist** | Xây dựng kho dữ liệu sạch nội bộ (RAG), chuẩn bị dữ liệu tri thức độc quyền để huấn luyện và tinh chỉnh các mô hình AI riêng của doanh nghiệp. | Data Quality, Vector Database, Tri thức ngành đặc thù, Quy định bảo mật |

### 3. Ba trụ cột năng lực "Bất khả xâm phạm" trước làn sóng AI

Để không bị đào thải và trở thành nhân sự không thể thay thế trong tổ chức, người làm Data cần tập trung rèn luyện 3 năng lực cốt lõi:

1. **Business Acumen (Sự nhạy bén kinh doanh)**: AI không biết rằng tuần trước nhà cung ứng thịt bò gặp sự cố vận chuyển nên món ăn chủ lực bị thiếu hàng. Con người sống trong bối cảnh thực tế của doanh nghiệp, hiểu mối quan hệ giữa các phòng ban và nắm bắt được tâm lý khách hàng nội địa.
2. **Critical Evaluation (Thẩm định phản biện)**: Các mô hình ngôn ngữ lớn luôn có xu hướng đưa ra câu trả lời có vẻ rất tự tin ngay cả khi chúng tính toán sai lệch. Một chuyên gia dữ liệu bản lĩnh là người có trực giác nhạy bén để nhận ra: *"Con số này nhìn có vẻ bất hợp lý, logic tính toán của AI đã bỏ sót các khoản chiết khấu thuế"*.
3. **Storytelling & Stakeholder Management (Nghệ thuật kể chuyện và thuyết phục)**: Thu thập số liệu chỉ chiếm 20% thành công; 80% còn lại là khả năng đứng trước Hội đồng quản trị, giải thích ý nghĩa của con số đó bằng ngôn ngữ kinh doanh giản dị và thúc đẩy mọi người hành động theo hướng đi đúng đắn.

> *"Trí tuệ nhân tạo sẽ không thay thế Data Analyst. Nhưng những Data Analyst biết sử dụng thành thạo AI để nhân bản năng suất của mình chắc chắn sẽ thay thế những người từ chối thay đổi."*
    `,
  },
  {
    id: 'art-chatgpt-canvas',
    category: 'Tin tức AI',
    isHot: false,
    gradient: 'linear-gradient(135deg, #1A2744 0%, #10A37F 100%)',
    title: 'OpenAI ra mắt ChatGPT Canvas: Cuộc cách mạng Giao diện Người dùng và Tương lai của Phân tích Dữ liệu Số',
    excerpt: 'Giao diện làm việc song song Canvas của OpenAI đánh dấu bước tiến lớn trong trải nghiệm người dùng: phá vỡ giới hạn của khung chat một chiều truyền thống, cho phép con người và AI cùng trực tiếp biên tập tài liệu phân tích, gỡ lỗi logic và xây dựng báo cáo chuyên nghiệp theo thời gian thực.',
    author: 'Đỗ Hoàng Nam – Product Lead tại EdTech Vietnam',
    authorInitials: 'HN',
    source: 'The Verge & OpenAI Product Insights',
    readTime: '8 phút đọc',
    date: '4 ngày trước',
    tags: ['OpenAI', 'ChatGPT Canvas', 'UX', 'Phân tích số liệu', 'Productivity'],
    views: 3890,
    likes: 295,
    content: `
## Nút thắt cổ chai của giao diện Chatbot truyền thống

Kể từ khi làn sóng Generative AI bùng nổ, giao diện người dùng (UI/UX) của các công cụ AI hầu như không thay đổi: **Một khung nhập liệu ở dưới cùng và một dòng tin nhắn cuộn dọc từ trên xuống.**

Mặc dù giao diện chatbox này rất dễ làm quen với người dùng đại chúng, nó lại bộc lộ những nhược điểm chí mạng đối với những người làm công việc kỹ thuật chuyên sâu như viết lách, phân tích dữ liệu và lập trình:
- **Mất ngữ cảnh và phân mảnh thông tin**: Khi bạn yêu cầu AI sửa lại một đoạn kết luận trong bản báo cáo dài 5 trang, AI thường phải in lại toàn bộ bài viết từ đầu, khiến màn hình bị trôi và người dùng mất rất nhiều thời gian dò tìm phần được thay đổi.
- **Thiếu tính tương tác hai chiều**: Người dùng không thể trực tiếp dùng chuột bôi đen một câu sai số liệu để yêu cầu giải thích, mà phải gõ lại một câu prompt dài dòng mô tả vị trí của câu đó.

Việc OpenAI chính thức trình làng giao diện **ChatGPT Canvas** được đánh giá là bước tiến quan trọng nhất về mặt trải nghiệm làm việc số kể từ ngày ChatGPT ra đời.

### 1. Không gian làm việc song song (Split-Screen Workspace)

Khi phát hiện người dùng đang thực hiện một dự án đòi hỏi sự trau chuốt và chỉnh sửa nhiều lần (như viết bài phân tích thị trường, phác thảo kế hoạch kinh doanh hoặc xây dựng kịch bản kiểm thử dữ liệu), hệ thống sẽ tự động mở ra một cửa sổ làm việc song song:

- **Cửa sổ bên trái**: Vẫn là khung chat để người dùng trao đổi ý tưởng và đưa ra các chỉ dẫn cấp cao.
- **Cửa sổ bên phải (Canvas)**: Một trình soạn thảo thông minh hiển thị toàn bộ nội dung bản báo cáo hoặc bảng phân tích. Mọi sửa đổi của AI được highlight rõ ràng như tính năng "Track Changes" trong Microsoft Word hay Google Docs.

### 2. Những cải tiến mang tính đột phá cho công việc Phân tích Dữ liệu

Đối với cộng đồng làm Data và Báo cáo quản trị, Canvas mang lại những giá trị vượt trội:

- **Chỉnh sửa cục bộ theo ngữ cảnh (Targeted In-line Editing)**: Bạn có thể dùng chuột bôi đen bảng dự phóng tài chính năm 2025 và ra lệnh: *"Hãy bổ sung kịch bản lạm phát tăng thêm 2% và tính toán lại biên lợi nhuận ròng"*. AI sẽ chỉ cập nhật đúng bảng đó mà giữ nguyên vẹn toàn bộ các phần phân tích khác xung quanh.
- **Thanh trượt điều chỉnh độ sâu phân tích (Reading Level Slider)**: Tính năng một chạm cho phép biến đổi ngôn ngữ của bản báo cáo: từ phong cách kỹ thuật học thuật chuyên sâu (dành cho đội ngũ Data Scientist) sang ngôn ngữ kinh doanh ngắn gọn, súc tích (dành cho Ban giám đốc hoặc nhà đầu tư).
- **Phê bình và Góp ý logic tự động (Review & Polish)**: Canvas đóng vai trò như một chuyên gia tư vấn giàu kinh nghiệm ngồi cạnh bạn, tự động quét qua toàn bộ luận điểm trong bài báo cáo, chỉ ra những chỗ suy luận còn yếu hoặc số liệu dẫn chứng chưa đủ sức thuyết phục.

### 3. Cuộc đối đầu triết lý: ChatGPT Canvas vs. Claude Artifacts

Sự xuất hiện của Canvas cho thấy OpenAI đang bám đuổi quyết liệt tính năng **Artifacts** vốn rất thành công của Anthropic. Tuy nhiên, hai gã khổng lồ công nghệ tiếp cận vấn đề theo hai triết lý rất khác nhau:

- **Claude Artifacts**: Tập trung vào việc tạo ra các "thành phẩm độc lập" có thể chạy tương tác trực tiếp trong sandbox (như một mini-app, biểu đồ SVG động hay bảng điều khiển React).
- **ChatGPT Canvas**: Tập trung vào quy trình "đồng sáng tạo văn bản và logic" (Collaborative Editing), nơi con người và AI có thể cùng lúc chỉnh sửa từng câu chữ và công thức tính toán.

Cuộc cạnh tranh lành mạnh này đang mang lại lợi ích to lớn cho người dùng, biến AI từ một cỗ máy trả lời thụ động thành một không gian làm việc số toàn năng cho thế hệ lao động tri thức tương lai.
    `,
  },
  {
    id: 'art-local-ai',
    category: 'Tin tức AI',
    isHot: false,
    gradient: 'linear-gradient(135deg, #0B1533 0%, #6366F1 100%)',
    title: 'DeepSeek-V3 và Llama 3.3: Làn sóng Local AI và Bài toán Bảo mật Dữ liệu Doanh nghiệp tại Việt Nam',
    excerpt: 'Tại sao các ngân hàng và tập đoàn tài chính tại Việt Nam đang đồng loạt chuyển hướng sang tự vận hành các mô hình mã nguồn mở như Llama 3 và DeepSeek trên cụm máy chủ nội bộ (On-premise)? Lời giải cho bài toán tuân thủ Nghị định 13 và tối ưu hóa chi phí vận hành hàng chục tỷ đồng mỗi năm.',
    author: 'Phạm Đình Vũ – Chuyên gia Bảo mật & Kiến trúc AI Doanh nghiệp',
    authorInitials: 'DV',
    source: 'Vietnam Financial Technology Forum',
    readTime: '12 phút đọc',
    date: '5 ngày trước',
    tags: ['DeepSeek', 'Llama 3', 'Local AI', 'Bảo mật dữ liệu', 'FinTech Vietnam'],
    views: 4210,
    likes: 367,
    content: `
## Khi dữ liệu kinh doanh là bí mật sống còn: Tại sao Cloud AI không phải là câu trả lời duy nhất?

Trong làn sóng bùng nổ của trí tuệ nhân tạo, các startup và doanh nghiệp nhỏ có thể thoải mái gửi dữ liệu qua các dịch vụ đám mây công cộng của OpenAI, Google hay Anthropic để tận hưởng sự tiện lợi.

Tuy nhiên, đối với các trụ cột kinh tế trọng yếu tại Việt Nam như **Ngân hàng (Vietcombank, MB, Techcombank, VPBank), Tập đoàn Bảo hiểm, Viễn thông và Y tế**, câu chuyện lại hoàn toàn khác. Việc đẩy dữ liệu giao dịch khách hàng, số dư tài khoản hay lịch sử bệnh án lên máy chủ đám mây đặt tại nước ngoài không chỉ là một rủi ro kinh doanh, mà còn là hành vi vi phạm pháp luật nghiêm trọng theo **Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân**.

Chính bối cảnh pháp lý và an ninh thông tin khắt khe này đã kích hoạt một làn sóng công nghệ mạnh mẽ chưa từng có trong giới kỹ thuật Việt Nam: **Xu hướng Local AI (Trí tuệ nhân tạo cục bộ) và Sovereign AI (AI Chủ quyền).**

### 1. Ba rào cản chí mạng khi phụ thuộc vào Cloud API quốc tế

Nhiều Giám đốc Công nghệ (CTO) và Giám đốc Dữ liệu (CDO) tại Việt Nam chia sẻ 3 lý do buộc họ phải tìm kiếm giải pháp thay thế Cloud AI:

- **Nguy cơ lộ lọt dữ liệu nội bộ và bí mật thuật toán**: Ngay cả khi các nhà cung cấp đám mây cam kết không sử dụng dữ liệu doanh nghiệp để huấn luyện mô hình, các cuộc tấn công mạng nhắm vào hạ tầng API hoặc lỗi cấu hình phân quyền vẫn tiềm ẩn nguy cơ rò rỉ dữ liệu tài chính nhạy cảm ra ngoài biên giới quốc gia.
- **Chi phí biến đổi (Variable Cost) tăng vọt ngoài tầm kiểm soát**: Khi một ngân hàng phục vụ 15 đến 20 triệu khách hàng, việc phân tích dữ liệu biến động số dư và chấm điểm tín dụng theo thời gian thực tiêu tốn hàng tỷ token API mỗi tháng. Chi phí thanh toán định kỳ bằng ngoại tệ trở thành gánh nặng tài chính khổng lồ.
- **Rủi ro gián đoạn dịch vụ và độ trễ mạng (Network Latency)**: Các đường cáp quang biển tại Việt Nam thường xuyên gặp sự cố đứt cáp, khiến việc kết nối đến các trung tâm dữ liệu ở Mỹ hay châu Âu bị chập chờn, không thể đáp ứng các yêu cầu xử lý dữ liệu giao dịch tức thời dưới 200 mili-giây.

### 2. Sự đột phá của các mô hình mã nguồn mở thế hệ mới: DeepSeek & Llama

Trước đây, ý tưởng tự chạy mô hình AI nội bộ thường bị hoài nghi vì các mô hình mã nguồn mở thế hệ cũ có trí thông minh thua kém rất xa GPT-4. Tuy nhiên, sự xuất hiện của **Llama 3.3 (Meta)** và đặc biệt là hiện tượng công nghệ chấn động toàn cầu **DeepSeek-V3** đã đảo ngược hoàn toàn cục diện:

- **Năng lực suy luận ngang tầm mô hình đóng hàng đầu**: Trên các bài kiểm tra tiêu chuẩn về toán học, phân tích cấu trúc dữ liệu và xử lý ngữ cảnh tiếng Việt, DeepSeek-V3 và Llama 3.3 đạt điểm số tương đương hoặc vượt qua GPT-4o.
- **Đột phá về chi phí tính toán nhờ kiến trúc MoE (Mixture-of-Experts)**: DeepSeek-V3 áp dụng kiến trúc chia nhỏ mô hình thành nhiều "chuyên gia" chuyên biệt. Khi xử lý một câu hỏi, hệ thống chỉ kích hoạt một phần nhỏ tham số cần thiết, giúp giảm yêu cầu phần cứng máy chủ đến 80% so với kiến trúc truyền thống.
- **Quyền tự chủ hoàn toàn mã nguồn (Full Ownership)**: Doanh nghiệp có thể tải toàn bộ trọng số mô hình về, cài đặt trong hệ thống máy chủ mạng kín (Air-gapped Network) không kết nối Internet bên ngoài, triệt tiêu 100% nguy cơ rò rỉ dữ liệu.

### 3. Lộ trình triển khai thực tế cho các doanh nghiệp Việt Nam

Các tập đoàn lớn tại Việt Nam hiện đang áp dụng kiến trúc **Hybrid AI (Trí tuệ nhân tạo lai)** theo 3 bước vững chắc:

1. **Phân loại dữ liệu theo cấp độ bảo mật (Data Classification)**: Dữ liệu công khai (như bài viết truyền thông, cẩm nang hỏi đáp chung) vẫn có thể dùng các dịch vụ Cloud AI để tiết kiệm chi phí ban đầu.
2. **Xây dựng cụm máy chủ GPU nội bộ**: Đầu tư các cụm máy chủ chuyên dụng đặt tại các trung tâm dữ liệu đạt chuẩn quốc tế tại Hà Nội hoặc TP. Hồ Chí Minh để vận hành mô hình mã nguồn mở cục bộ.
3. **Huấn luyện tinh chỉnh bằng tri thức nội bộ (Fine-tuning & RAG)**: Nạp toàn bộ kho văn bản quy phạm pháp luật, quy định nội bộ ngân hàng và dữ liệu lịch sử giao dịch ẩn danh vào hệ thống cơ sở dữ liệu vector cục bộ, biến cỗ máy AI thành một chuyên gia am hiểu sâu sắc nghiệp vụ kinh doanh của chính doanh nghiệp mình.

Làn sóng Local AI không chỉ giải bài toán tuân thủ pháp lý cho các ngân hàng, mà đang mở ra một kỷ nguyên mới: Nơi mỗi doanh nghiệp Việt Nam thực sự làm chủ tài sản trí tuệ và cỗ máy dữ liệu của chính mình.
    `,
  },
];

// ── Q&A Questions ──────────────────────────────
export const QUESTIONS = [
  {
    id: 'q1',
    title: 'Làm thế nào để xử lý missing values trong Pandas một cách hiệu quả?',
    body: 'Tôi có một DataFrame với khoảng 15% missing values ở nhiều cột khác nhau. Một số cột là numeric, một số là categorical. Nên dùng phương pháp nào để impute? Và khi nào thì nên drop rows thay vì impute?',
    tags: ['Pandas', 'Python', 'Data Cleaning'],
    author: 'Trần Văn An',
    authorInitials: 'VA',
    reputation: 340,
    votes: 24,
    answers: 3,
    views: 487,
    date: '2024-10-28',
    solved: true,
    userVoted: null,
  },
  {
    id: 'q2',
    title: 'Sự khác biệt giữa INNER JOIN, LEFT JOIN và FULL OUTER JOIN trong SQL?',
    body: 'Tôi thường xuyên bị nhầm lẫn giữa các loại JOIN. Khi nào dùng LEFT JOIN, khi nào dùng INNER JOIN? Có thể giải thích bằng ví dụ cụ thể không?',
    tags: ['SQL'],
    author: 'Lê Thị Bích',
    authorInitials: 'TB',
    reputation: 215,
    votes: 18,
    answers: 2,
    views: 632,
    date: '2024-10-27',
    solved: true,
    userVoted: null,
  },
  {
    id: 'q3',
    title: 'Cách tính percentile và quartile với NumPy và Pandas?',
    body: 'Tôi cần tính Q1, Q3 và IQR để phát hiện outlier. Dùng numpy.percentile hay pandas.quantile? Sự khác biệt giữa hai method này là gì?',
    tags: ['NumPy', 'Pandas', 'Statistics'],
    author: 'Phạm Quốc Hùng',
    authorInitials: 'QH',
    reputation: 890,
    votes: 31,
    answers: 4,
    views: 1023,
    date: '2024-10-26',
    solved: true,
    userVoted: null,
  },
  {
    id: 'q4',
    title: 'Làm thế nào để merge nhiều DataFrame theo nhiều điều kiện trong Pandas?',
    body: 'Tôi có 3 DataFrames cần merge: df_sales (date, product_id, amount), df_products (product_id, category, price), df_regions (region_id, region_name). Cần merge để có đủ thông tin cho phân tích. Cách tối ưu nhất?',
    tags: ['Pandas', 'Python'],
    author: 'Nguyễn Minh Châu',
    authorInitials: 'MC',
    reputation: 560,
    votes: 12,
    answers: 1,
    views: 234,
    date: '2024-10-25',
    solved: false,
    userVoted: null,
  },
  {
    id: 'q5',
    title: 'Cách visualize correlation matrix bằng Seaborn và cách đọc kết quả?',
    body: 'Tôi tạo được correlation heatmap nhưng không biết cách đọc và interpret kết quả. Coefficient bao nhiêu thì được coi là strong correlation? Và làm sao biết correlation nào có ý nghĩa thống kê?',
    tags: ['Statistics', 'Python', 'Visualization'],
    author: 'Vũ Thị Hằng',
    authorInitials: 'TH',
    reputation: 125,
    votes: 8,
    answers: 0,
    views: 156,
    date: '2024-10-24',
    solved: false,
    userVoted: null,
  },
  {
    id: 'q6',
    title: 'Group By và Having trong SQL: Khi nào dùng HAVING thay vì WHERE?',
    body: 'Tôi biết WHERE để filter rows, nhưng không hiểu tại sao cần HAVING sau GROUP BY. Có thể cho ví dụ cụ thể về trường hợp HAVING là bắt buộc không?',
    tags: ['SQL'],
    author: 'Đỗ Anh Tuấn',
    authorInitials: 'AT',
    reputation: 445,
    votes: 22,
    answers: 3,
    views: 789,
    date: '2024-10-23',
    solved: true,
    userVoted: null,
  },
];

export const ANSWERS = {
  q1: [
    {
      id: 'ans1-1',
      questionId: 'q1',
      author: 'Nguyễn Minh Khoa',
      authorInitials: 'MK',
      reputation: 1240,
      body: `Đây là một câu hỏi hay! Tôi sẽ chia sẻ workflow tôi hay dùng:

**1. Phân tích missing values trước:**
\`\`\`python
# Tỷ lệ missing mỗi cột
missing_pct = df.isnull().sum() / len(df) * 100
print(missing_pct[missing_pct > 0].sort_values(ascending=False))
\`\`\`

**2. Quyết định strategy:**
- **< 5% missing**: Safe to drop rows
- **5-30% missing**: Impute (median cho numeric, mode cho categorical)
- **> 30% missing**: Cân nhắc drop cột hoặc dùng model-based imputation

**3. Code mẫu:**
\`\`\`python
from sklearn.impute import SimpleImputer, KNNImputer

# Numeric: median imputation
num_cols = df.select_dtypes(include='number').columns
df[num_cols] = SimpleImputer(strategy='median').fit_transform(df[num_cols])

# Categorical: most_frequent
cat_cols = df.select_dtypes(include='object').columns
df[cat_cols] = SimpleImputer(strategy='most_frequent').fit_transform(df[cat_cols])
\`\`\``,
      votes: 18,
      userVoted: null,
      accepted: true,
      date: '2024-10-28',
    },
    {
      id: 'ans1-2',
      questionId: 'q1',
      author: 'Lê Văn Dũng',
      authorInitials: 'VD',
      reputation: 780,
      body: `Bổ sung thêm: với dữ liệu time series, hãy dùng **forward fill** hoặc **backward fill**:

\`\`\`python
# Time series imputation
df['price'] = df['price'].ffill()  # lấy giá trị trước
df['price'] = df['price'].bfill()  # lấy giá trị sau

# Interpolation cho dữ liệu liên tục
df['temperature'] = df['temperature'].interpolate(method='linear')
\`\`\`

Cũng nên kiểm tra xem missing có pattern không (MCAR, MAR, MNAR) để chọn phương pháp phù hợp.`,
      votes: 11,
      userVoted: null,
      accepted: false,
      date: '2024-10-28',
    },
    {
      id: 'ans1-3',
      questionId: 'q1',
      author: 'Phạm Thị Hoa',
      authorInitials: 'TH',
      reputation: 430,
      body: `Thêm một điểm quan trọng: luôn **impute AFTER train/test split** để tránh data leakage!

\`\`\`python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Fit imputer CHỈ trên train set
imputer = SimpleImputer(strategy='median')
X_train = imputer.fit_transform(X_train)
X_test = imputer.transform(X_test)  # chỉ transform, không fit
\`\`\``,
      votes: 7,
      userVoted: null,
      accepted: false,
      date: '2024-10-29',
    },
  ],
  q2: [
    {
      id: 'ans2-1',
      questionId: 'q2',
      author: 'Đặng Văn Khải',
      authorInitials: 'VK',
      reputation: 920,
      body: `Giải thích đơn giản nhất:

- **INNER JOIN**: Chỉ lấy rows có match ở CẢ HAI bảng
- **LEFT JOIN**: Lấy TẤT CẢ rows của bảng trái, bảng phải NULL nếu không có match
- **FULL OUTER JOIN**: Lấy TẤT CẢ rows của cả hai bảng

\`\`\`sql
-- Ví dụ: Table orders (100 rows) và table customers (80 rows)
-- Chỉ 70 orders có customer tương ứng

SELECT o.order_id, c.customer_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
-- Kết quả: 70 rows (chỉ matched)

SELECT o.order_id, c.customer_name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id;
-- Kết quả: 100 rows (30 rows có customer_name = NULL)
\`\`\``,
      votes: 15,
      userVoted: null,
      accepted: true,
      date: '2024-10-27',
    },
    {
      id: 'ans2-2',
      questionId: 'q2',
      author: 'Trần Văn An',
      authorInitials: 'VA',
      reputation: 340,
      body: `Thêm vào: **Khi nào dùng loại nào?**

- INNER JOIN: Khi bạn CHỈ quan tâm đến records có đủ data ở cả hai bảng
- LEFT JOIN: Khi bảng trái là bảng chính, bảng phải là thông tin bổ sung (có thể NULL)
- FULL OUTER JOIN: Khi cần kiểm tra data integrity hoặc tìm orphan records

Tip: 90% trường hợp dùng INNER JOIN hoặc LEFT JOIN là đủ!`,
      votes: 9,
      userVoted: null,
      accepted: false,
      date: '2024-10-27',
    },
  ],
  q3: [
    {
      id: 'ans3-1',
      questionId: 'q3',
      author: 'Nguyễn Thị Mai',
      authorInitials: 'NM',
      reputation: 1450,
      body: `Cả hai đều cho kết quả giống nhau nhưng syntax khác:

\`\`\`python
import numpy as np
import pandas as pd

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]  # 100 là outlier

# NumPy
Q1 = np.percentile(data, 25)
Q3 = np.percentile(data, 75)

# Pandas (tương đương)
s = pd.Series(data)
Q1 = s.quantile(0.25)  # = np.percentile(data, 25)
Q3 = s.quantile(0.75)

IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"Q1={Q1}, Q3={Q3}, IQR={IQR}")
print(f"Bounds: [{lower_bound:.1f}, {upper_bound:.1f}]")

# Lọc outlier
outliers = [x for x in data if x < lower_bound or x > upper_bound]
print(f"Outliers: {outliers}")  # [100]
\`\`\`

Dùng Pandas khi làm việc với DataFrame, NumPy khi làm việc với array thuần túy.`,
      votes: 24,
      userVoted: null,
      accepted: true,
      date: '2024-10-26',
    },
  ],
  q6: [
    {
      id: 'ans6-1',
      questionId: 'q6',
      author: 'Hoàng Minh Tuấn',
      authorInitials: 'MT',
      reputation: 2100,
      body: `Rule đơn giản: **WHERE filter TRƯỚC GROUP BY, HAVING filter SAU GROUP BY**.

\`\`\`sql
-- Ví dụ: Tìm các region có tổng doanh thu > 1 triệu
SELECT
    region,
    SUM(revenue) as total_revenue,
    COUNT(*) as order_count
FROM orders
WHERE order_date >= '2024-01-01'  -- filter rows TRƯỚC khi group
GROUP BY region
HAVING SUM(revenue) > 1000000    -- filter GROUPS sau khi tổng hợp
ORDER BY total_revenue DESC;
\`\`\`

**Tại sao không dùng WHERE thay HAVING?**
WHERE không thể dùng aggregate functions (SUM, COUNT, AVG...) vì chúng chưa được tính ở giai đoạn WHERE.`,
      votes: 19,
      userVoted: null,
      accepted: true,
      date: '2024-10-23',
    },
  ],
};

// ── Practice Exercises ──────────────────────────
export const EXERCISES = [
  {
    "id": "py-1",
    "nodeId": "py",
    "moduleName": "Python Fundamentals",
    "title": "Khai báo biến và ép kiểu dữ liệu Python cơ bản",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "Python",
      "Variables",
      "Type Casting"
    ],
    "description": "Trong phân tích dữ liệu, dữ liệu thô nhập vào thường ở dạng chuỗi (string). Bạn cần chuyển đổi đúng kiểu dữ liệu (int, float, boolean) để sẵn sàng tính toán.\n\n**Yêu cầu:**\n1. Chuyển đổi chuỗi doanh thu `revenue_str = '15000000'` sang kiểu số nguyên (int).\n2. Chuyển đổi chuỗi tỉ lệ hoàn trả `refund_rate_str = '0.045'` sang kiểu số thực (float).\n3. Tính `net_revenue = revenue * (1 - refund_rate)` và in kết quả làm tròn thành số nguyên.",
    "starterCode": "revenue_str = '15000000'\nrefund_rate_str = '0.045'\n\n# TODO: Chuyển đổi kiểu dữ liệu và tính net_revenue\nrevenue = int(revenue_str)\nrefund_rate = float(refund_rate_str)\nnet_revenue = int(revenue * (1 - refund_rate))\n\nprint(f\"Net Revenue: {net_revenue}\")\n",
    "solution": "revenue = int('15000000')\nrefund_rate = float('0.045')\nnet_revenue = int(revenue * (1 - refund_rate))\nprint(f\"Net Revenue: {net_revenue}\")",
    "expectedOutput": "Net Revenue: 14325000",
    "xpReward": 50
  },
  {
    "id": "py-2",
    "nodeId": "py",
    "moduleName": "Python Fundamentals",
    "title": "Xử lý chuỗi và List Comprehension nâng cao",
    "skill": "filtering",
    "difficulty": "Medium",
    "tags": [
      "Python",
      "List Comprehension",
      "String Manipulation"
    ],
    "description": "Bạn nhận được danh sách mã SKU sản phẩm từ kho vận bị lẫn khoảng trắng thừa và chữ thường/hoa không nhất quán: `['  vn-LAPTOP-01 ', ' VN-phone-02', 'VN-tablet-03  ', 'US-watch-04']`.\n\n**Yêu cầu:**\nSử dụng List Comprehension để làm sạch danh sách: loại bỏ khoảng trắng thừa, viết hoa toàn bộ và chỉ giữ lại các mã sản phẩm bắt đầu bằng `VN-`.",
    "starterCode": "raw_skus = ['  vn-LAPTOP-01 ', ' VN-phone-02', 'VN-tablet-03  ', 'US-watch-04']\n\n# TODO: Viết 1 dòng list comprehension để lọc và chuẩn hóa\nclean_skus = [sku.strip().upper() for sku in raw_skus if sku.strip().upper().startswith('VN-')]\n\nprint(\"Cleaned SKUs:\", clean_skus)\n",
    "solution": "raw_skus = ['  vn-LAPTOP-01 ', ' VN-phone-02', 'VN-tablet-03  ', 'US-watch-04']\nclean_skus = [sku.strip().upper() for sku in raw_skus if sku.strip().upper().startswith('VN-')]\nprint('Cleaned SKUs:', clean_skus)",
    "expectedOutput": "Cleaned SKUs: ['VN-LAPTOP-01', 'VN-PHONE-02', 'VN-TABLET-03']",
    "xpReward": 75
  },
  {
    "id": "py-3",
    "nodeId": "py",
    "moduleName": "Python Fundamentals",
    "title": "Tối ưu hóa thuật toán với Generator & Lambda",
    "skill": "filtering",
    "difficulty": "Hard",
    "tags": [
      "Python",
      "Generators",
      "Lambda",
      "Memory Optimization"
    ],
    "description": "Khi xử lý stream dữ liệu hàng triệu dòng giao dịch, sử dụng Generator giúp tiết kiệm RAM vượt trội so với nạp toàn bộ mảng vào bộ nhớ.\n\n**Yêu cầu:**\n1. Viết generator function `stream_valid_transactions(transactions, min_amount)` sinh ra từng giao dịch có giá trị >= `min_amount`.\n2. Sử dụng lambda function để tính phí hoa hồng 1.5% cho mỗi giao dịch được stream ra.",
    "starterCode": "transactions = [120000, 45000, 300000, 85000, 500000, 20000]\n\ndef stream_valid_transactions(tx_list, min_amount):\n    for tx in tx_list:\n        if tx >= min_amount:\n            yield tx\n\ncalc_fee = lambda x: x * 0.015\n\nvalid_fees = [calc_fee(tx) for tx in stream_valid_transactions(transactions, 100000)]\nprint(\"Transaction Fees:\", valid_fees)\n",
    "solution": "transactions = [120000, 45000, 300000, 85000, 500000, 20000]\ndef stream_valid_transactions(tx_list, min_amount):\n    for tx in tx_list:\n        if tx >= min_amount:\n            yield tx\ncalc_fee = lambda x: x * 0.015\nvalid_fees = [calc_fee(tx) for tx in stream_valid_transactions(transactions, 100000)]\nprint('Transaction Fees:', valid_fees)",
    "expectedOutput": "Transaction Fees: [1800.0, 4500.0, 7500.0]",
    "xpReward": 100
  },
  {
    "id": "np-1",
    "nodeId": "np",
    "moduleName": "NumPy",
    "title": "Khởi tạo mảng NumPy và Reshape ma trận 2D",
    "skill": "statistics",
    "difficulty": "Easy",
    "tags": [
      "NumPy",
      "Arrays",
      "Reshape"
    ],
    "description": "Cho mảng doanh thu 12 tháng liên tục: `[12, 15, 18, 14, 20, 22, 25, 28, 24, 30, 32, 35]`.\n\n**Yêu cầu:**\n1. Chuyển danh sách thành mảng `numpy.ndarray` 1 chiều.\n2. Reshape ma trận thành kích thước `(4, 3)` tượng trưng cho 4 quý trong năm, mỗi quý 3 tháng.\n3. Tính tổng doanh thu của từng Quý bằng `np.sum(axis=1)`.",
    "starterCode": "import numpy as np\n\nmonthly_rev = np.array([12, 15, 18, 14, 20, 22, 25, 28, 24, 30, 32, 35])\nquarterly_matrix = monthly_rev.reshape(4, 3)\nquarterly_totals = np.sum(quarterly_matrix, axis=1)\n\nprint(\"Quarterly Matrix Shape:\", quarterly_matrix.shape)\nprint(\"Quarterly Totals:\", quarterly_totals)\n",
    "solution": "import numpy as np\nmonthly_rev = np.array([12, 15, 18, 14, 20, 22, 25, 28, 24, 30, 32, 35])\nquarterly_matrix = monthly_rev.reshape(4, 3)\nquarterly_totals = np.sum(quarterly_matrix, axis=1)\nprint('Quarterly Matrix Shape:', quarterly_matrix.shape)\nprint('Quarterly Totals:', quarterly_totals)",
    "expectedOutput": "Quarterly Matrix Shape: (4, 3)\nQuarterly Totals: [45 56 77 97]",
    "xpReward": 50
  },
  {
    "id": "np-2",
    "nodeId": "np",
    "moduleName": "NumPy",
    "title": "Thao tác Broadcasting và Matrix Multiplication",
    "skill": "statistics",
    "difficulty": "Medium",
    "tags": [
      "NumPy",
      "Broadcasting",
      "Dot Product"
    ],
    "description": "Bạn có ma trận số lượng bán của 3 sản phẩm tại 2 cửa hàng, và mảng đơn giá tương ứng.\n- `quantities = np.array([[10, 20, 30], [5, 15, 25]])` (shape: 2x3)\n- `prices = np.array([100, 200, 150])` (đơn giá của 3 sản phẩm)\n\n**Yêu cầu:** Tính doanh thu của từng cửa hàng bằng phép nhân ma trận Dot Product (`@` hoặc `np.dot`).",
    "starterCode": "import numpy as np\n\nquantities = np.array([[10, 20, 30], [5, 15, 25]])\nprices = np.array([100, 200, 150])\n\nstore_revenues = quantities @ prices\nprint(\"Store Revenues:\", store_revenues)\n",
    "solution": "import numpy as np\nquantities = np.array([[10, 20, 30], [5, 15, 25]])\nprices = np.array([100, 200, 150])\nstore_revenues = quantities @ prices\nprint('Store Revenues:', store_revenues)",
    "expectedOutput": "Store Revenues: [9500 7250]",
    "xpReward": 75
  },
  {
    "id": "np-3",
    "nodeId": "np",
    "moduleName": "NumPy",
    "title": "Tối ưu tính toán đại số tuyến tính với numpy.linalg",
    "skill": "statistics",
    "difficulty": "Hard",
    "tags": [
      "NumPy",
      "Linear Algebra",
      "Linalg",
      "Optimization"
    ],
    "description": "Trong mô hình dự báo kinh tế lượng (OLS Regression), hệ số hồi quy được giải theo công thức $B = (X^T X)^{-1} X^T Y$.\n\n**Yêu cầu:**\nCho ma trận feature `X = np.array([[1, 2], [1, 3], [1, 4], [1, 5]])` và nhãn `Y = np.array([5, 7, 9, 11])`.\nSử dụng `np.linalg.inv` hoặc `np.linalg.pinv` để tìm vector trọng số `beta`.",
    "starterCode": "import numpy as np\n\nX = np.array([[1, 2], [1, 3], [1, 4], [1, 5]])\nY = np.array([5, 7, 9, 11])\n\n# Beta = (X^T * X)^(-1) * X^T * Y\nbeta = np.linalg.inv(X.T @ X) @ X.T @ Y\nprint(\"Intercept and Slope:\", np.round(beta, 2))\n",
    "solution": "import numpy as np\nX = np.array([[1, 2], [1, 3], [1, 4], [1, 5]])\nY = np.array([5, 7, 9, 11])\nbeta = np.linalg.inv(X.T @ X) @ X.T @ Y\nprint('Intercept and Slope:', np.round(beta, 2))",
    "expectedOutput": "Intercept and Slope: [1. 2.]",
    "xpReward": 100
  },
  {
    "id": "ex1",
    "nodeId": "pd",
    "moduleName": "Pandas",
    "title": "Lọc dữ liệu với điều kiện phức hợp",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "Pandas",
      "Filtering",
      "Boolean Indexing"
    ],
    "description": "Cho DataFrame chứa dữ liệu bán hàng. Lọc tất cả đơn hàng thỏa mãn:\n1. Status là 'completed'\n2. Amount > 500,000\n3. Category không phải 'Fashion'",
    "starterCode": "import pandas as pd\n\ndata = {\n    'order_id': range(1, 6),\n    'product': ['Laptop', 'Phone', 'Shirt', 'TV', 'Jeans'],\n    'category': ['Electronics', 'Electronics', 'Fashion', 'Electronics', 'Fashion'],\n    'amount': [25000000, 8000000, 350000, 15000000, 450000],\n    'status': ['completed', 'cancelled', 'completed', 'completed', 'completed']\n}\ndf = pd.DataFrame(data)\n\nresult = df[(df['status'] == 'completed') & (df['amount'] > 500000) & (df['category'] != 'Fashion')]\nprint(\"Filtered Count:\", len(result))\nprint(result[['order_id', 'product', 'amount']])\n",
    "solution": "import pandas as pd\ndata = {'order_id': range(1, 6), 'product': ['Laptop', 'Phone', 'Shirt', 'TV', 'Jeans'], 'category': ['Electronics', 'Electronics', 'Fashion', 'Electronics', 'Fashion'], 'amount': [25000000, 8000000, 350000, 15000000, 450000], 'status': ['completed', 'cancelled', 'completed', 'completed', 'completed']}\ndf = pd.DataFrame(data)\nresult = df[(df['status'] == 'completed') & (df['amount'] > 500000) & (df['category'] != 'Fashion')]\nprint('Filtered Count:', len(result))\nprint(result[['order_id', 'product', 'amount']])",
    "expectedOutput": "Filtered Count: 2\n   order_id product    amount\n0         1  Laptop  25000000\n3         4      TV  15000000",
    "xpReward": 50
  },
  {
    "id": "pd-2",
    "nodeId": "pd",
    "moduleName": "Pandas",
    "title": "Indexing đa tầng (MultiIndex) và Slicing nâng cao",
    "skill": "filtering",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "MultiIndex",
      "Loc",
      "Slicing"
    ],
    "description": "Trong báo cáo tài chính khu vực, dữ liệu thường được phân tầng theo `[Region, Year]`. Hãy sử dụng `.set_index()` và `.loc` để truy xuất doanh thu của miền 'North' trong năm 2024.",
    "starterCode": "import pandas as pd\n\ndata = {\n    'Region': ['North', 'North', 'South', 'South'],\n    'Year': [2023, 2024, 2023, 2024],\n    'Revenue': [1200, 1500, 900, 1100]\n}\ndf = pd.DataFrame(data).set_index(['Region', 'Year'])\n\ntarget_rev = df.loc[('North', 2024), 'Revenue']\nprint(f\"North 2024 Revenue: {target_rev}\")\n",
    "solution": "import pandas as pd\ndata = {'Region': ['North', 'North', 'South', 'South'], 'Year': [2023, 2024, 2023, 2024], 'Revenue': [1200, 1500, 900, 1100]}\ndf = pd.DataFrame(data).set_index(['Region', 'Year'])\nprint(f\"North 2024 Revenue: {df.loc[('North', 2024), 'Revenue']}\")",
    "expectedOutput": "North 2024 Revenue: 1500",
    "xpReward": 75
  },
  {
    "id": "pd-3",
    "nodeId": "pd",
    "moduleName": "Pandas",
    "title": "Xử lý dữ liệu chuỗi thời gian (TimeSeries Resampling)",
    "skill": "filtering",
    "difficulty": "Hard",
    "tags": [
      "Pandas",
      "TimeSeries",
      "Resample",
      "Rolling Window"
    ],
    "description": "Dữ liệu bán hàng theo ngày cần được tổng hợp lại theo tuần (Weekly) và tính trung bình động 7 ngày (7-day rolling mean) để làm mịn xu hướng.\n\n**Yêu cầu:** Chuyển cột ngày thành DatetimeIndex, resample theo tuần ('W') và tính tổng doanh thu tuần.",
    "starterCode": "import pandas as pd\n\ndates = pd.date_range('2024-01-01', periods=14, freq='D')\nrev = [100, 120, 110, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230]\ndf = pd.DataFrame({'Revenue': rev}, index=dates)\n\nweekly = df.resample('W').sum()\nprint(\"Weekly Totals:\")\nprint(weekly)\n",
    "solution": "import pandas as pd\ndates = pd.date_range('2024-01-01', periods=14, freq='D')\nrev = [100, 120, 110, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230]\ndf = pd.DataFrame({'Revenue': rev}, index=dates)\nweekly = df.resample('W').sum()\nprint('Weekly Totals:')\nprint(weekly)",
    "expectedOutput": "Weekly Totals:\n            Revenue\n2024-01-07      910\n2024-01-14     1400",
    "xpReward": 100
  },
  {
    "id": "ex2",
    "nodeId": "dc",
    "moduleName": "Data Cleaning",
    "title": "Xử lý Missing Values đa dạng chiến lược",
    "skill": "missing_values",
    "difficulty": "Easy",
    "tags": [
      "Pandas",
      "Data Cleaning",
      "Imputation"
    ],
    "description": "Xử lý giá trị null trong DataFrame nhân sự:\n1. Cột 'department': điền 'Unknown'\n2. Cột 'salary': điền bằng giá trị median\n3. Cột 'email': xóa bỏ các dòng bị thiếu email",
    "starterCode": "import pandas as pd\nimport numpy as np\n\ndata = {\n    'name': ['An', 'Binh', 'Chi', 'Dung', 'Em'],\n    'department': ['IT', np.nan, 'HR', 'IT', np.nan],\n    'salary': [15000000, 22000000, np.nan, 18000000, 12000000],\n    'email': ['an@co.com', 'binh@co.com', np.nan, 'dung@co.com', 'em@co.com']\n}\ndf = pd.DataFrame(data)\n\ndf['department'] = df['department'].fillna('Unknown')\ndf['salary'] = df['salary'].fillna(df['salary'].median())\nclean_df = df.dropna(subset=['email'])\n\nprint(\"Remaining rows:\", len(clean_df))\nprint(clean_df[['name', 'department', 'salary']])\n",
    "solution": "import pandas as pd\nimport numpy as np\ndata = {'name': ['An', 'Binh', 'Chi', 'Dung', 'Em'], 'department': ['IT', np.nan, 'HR', 'IT', np.nan], 'salary': [15000000, 22000000, np.nan, 18000000, 12000000], 'email': ['an@co.com', 'binh@co.com', np.nan, 'dung@co.com', 'em@co.com']}\ndf = pd.DataFrame(data)\ndf['department'] = df['department'].fillna('Unknown')\ndf['salary'] = df['salary'].fillna(df['salary'].median())\nclean_df = df.dropna(subset=['email'])\nprint('Remaining rows:', len(clean_df))\nprint(clean_df[['name', 'department', 'salary']])",
    "expectedOutput": "Remaining rows: 4\n    name department      salary\n0     An         IT  15000000.0\n1   Binh    Unknown  22000000.0\n3   Dung         IT  18000000.0\n4     Em    Unknown  12000000.0",
    "xpReward": 50
  },
  {
    "id": "dc-2",
    "nodeId": "dc",
    "moduleName": "Data Cleaning",
    "title": "Chuẩn hóa chuỗi văn bản và định dạng ngày tháng",
    "skill": "missing_values",
    "difficulty": "Medium",
    "tags": [
      "Data Cleaning",
      "Regex",
      "Datetime Parsing"
    ],
    "description": "Cột ngày tháng `['2024/01/15', '16-02-2024', '2024.03.20']` bị định dạng hỗn tạp. Hãy dùng `pd.to_datetime(format='mixed')` để chuẩn hóa tất cả về định dạng ISO YYYY-MM-DD.",
    "starterCode": "import pandas as pd\n\nraw_dates = pd.Series(['2024/01/15', '2024-02-16', '2024.03.20'])\nclean_dates = pd.to_datetime(raw_dates, format='mixed').dt.strftime('%Y-%m-%d')\n\nprint(\"Standardized Dates:\")\nprint(clean_dates.tolist())\n",
    "solution": "import pandas as pd\nraw_dates = pd.Series(['2024/01/15', '2024-02-16', '2024.03.20'])\nclean_dates = pd.to_datetime(raw_dates, format='mixed').dt.strftime('%Y-%m-%d')\nprint('Standardized Dates:')\nprint(clean_dates.tolist())",
    "expectedOutput": "Standardized Dates:\n['2024-01-15', '2024-02-16', '2024-03-20']",
    "xpReward": 75
  },
  {
    "id": "dc-3",
    "nodeId": "dc",
    "moduleName": "Data Cleaning",
    "title": "Khử trùng lặp và làm sạch bộ dữ liệu đa nguồn",
    "skill": "missing_values",
    "difficulty": "Hard",
    "tags": [
      "Data Cleaning",
      "Deduplication",
      "Composite Keys"
    ],
    "description": "Bộ dữ liệu đơn hàng bị trùng lặp do đồng bộ nhiều lần. Hãy khử trùng lặp theo cặp khóa `['customer_id', 'order_date']` và chỉ giữ lại bản ghi có `order_amount` lớn nhất.",
    "starterCode": "import pandas as pd\n\ndata = {\n    'customer_id': [101, 102, 101, 103, 102],\n    'order_date': ['2024-01-01', '2024-01-02', '2024-01-01', '2024-01-03', '2024-01-02'],\n    'order_amount': [500, 700, 650, 400, 700]\n}\ndf = pd.DataFrame(data)\n\n# Sắp xếp giảm dần theo amount và drop duplicates giữ bản ghi đầu\ndf_sorted = df.sort_values('order_amount', ascending=False)\ndeduped = df_sorted.drop_duplicates(subset=['customer_id', 'order_date'], keep='first').sort_index()\n\nprint(\"Deduplicated Count:\", len(deduped))\nprint(deduped[['customer_id', 'order_amount']])\n",
    "solution": "import pandas as pd\ndata = {'customer_id': [101, 102, 101, 103, 102], 'order_date': ['2024-01-01', '2024-01-02', '2024-01-01', '2024-01-03', '2024-01-02'], 'order_amount': [500, 700, 650, 400, 700]}\ndf = pd.DataFrame(data)\ndf_sorted = df.sort_values('order_amount', ascending=False)\ndeduped = df_sorted.drop_duplicates(subset=['customer_id', 'order_date'], keep='first').sort_index()\nprint('Deduplicated Count:', len(deduped))\nprint(deduped[['customer_id', 'order_amount']])",
    "expectedOutput": "Deduplicated Count: 3\n   customer_id  order_amount\n1          102           700\n2          101           650\n3          103           400",
    "xpReward": 100
  },
  {
    "id": "ex3",
    "nodeId": "dt",
    "moduleName": "Data Transformation",
    "title": "GroupBy và Tổng hợp doanh thu chi nhánh",
    "skill": "groupby",
    "difficulty": "Easy",
    "tags": [
      "Pandas",
      "GroupBy",
      "Aggregation"
    ],
    "description": "Nhóm dữ liệu theo chi nhánh (branch) và danh mục (category) để tính tổng doanh thu và số lượng đơn hàng.",
    "starterCode": "import pandas as pd\n\ndata = {\n    'branch': ['HN', 'HN', 'HCM', 'HCM', 'HCM'],\n    'category': ['Food', 'Tech', 'Food', 'Tech', 'Food'],\n    'revenue': [100, 200, 150, 300, 250]\n}\ndf = pd.DataFrame(data)\n\nsummary = df.groupby('branch')['revenue'].agg(['sum', 'count']).rename(columns={'sum': 'Total_Rev', 'count': 'Orders'})\nprint(summary)\n",
    "solution": "import pandas as pd\ndata = {'branch': ['HN', 'HN', 'HCM', 'HCM', 'HCM'], 'category': ['Food', 'Tech', 'Food', 'Tech', 'Food'], 'revenue': [100, 200, 150, 300, 250]}\ndf = pd.DataFrame(data)\nsummary = df.groupby('branch')['revenue'].agg(['sum', 'count']).rename(columns={'sum': 'Total_Rev', 'count': 'Orders'})\nprint(summary)",
    "expectedOutput": "        Total_Rev  Orders\nbranch                   \nHCM           700       3\nHN            300       2",
    "xpReward": 50
  },
  {
    "id": "ex4",
    "nodeId": "dt",
    "moduleName": "Data Transformation",
    "title": "Merge và Nối bảng dữ liệu khách hàng",
    "skill": "merge",
    "difficulty": "Medium",
    "tags": [
      "Pandas",
      "Merge",
      "Joins"
    ],
    "description": "Thực hiện LEFT JOIN giữa bảng `customers` và bảng `orders` dựa trên khóa `customer_id`. Điền 0 cho những khách hàng chưa phát sinh đơn nào.",
    "starterCode": "import pandas as pd\n\ncustomers = pd.DataFrame({'cust_id': [1, 2, 3], 'name': ['Minh', 'Hoa', 'Tuan']})\norders = pd.DataFrame({'cust_id': [1, 1, 2], 'amount': [500, 300, 700]})\n\nmerged = pd.merge(customers, orders, on='cust_id', how='left')\nmerged['amount'] = merged['amount'].fillna(0)\nprint(merged)\n",
    "solution": "import pandas as pd\ncustomers = pd.DataFrame({'cust_id': [1, 2, 3], 'name': ['Minh', 'Hoa', 'Tuan']})\norders = pd.DataFrame({'cust_id': [1, 1, 2], 'amount': [500, 300, 700]})\nmerged = pd.merge(customers, orders, on='cust_id', how='left')\nmerged['amount'] = merged['amount'].fillna(0)\nprint(merged)",
    "expectedOutput": "   cust_id  name  amount\n0        1  Minh   500.0\n1        1  Minh   300.0\n2        2   Hoa   700.0\n3        3  Tuan     0.0",
    "xpReward": 75
  },
  {
    "id": "dt-3",
    "nodeId": "dt",
    "moduleName": "Data Transformation",
    "title": "Window Functions và tính toán Running Total bằng Pandas",
    "skill": "groupby",
    "difficulty": "Hard",
    "tags": [
      "Pandas",
      "Window Functions",
      "Cumulative Sum"
    ],
    "description": "Tính tổng lũy kế doanh thu cộng dồn theo thời gian (Running Total / Cumulative Sum) và tỉ trọng % đóng góp của từng đơn hàng so với tổng doanh thu.",
    "starterCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    'day': [1, 2, 3, 4],\n    'revenue': [1000, 1500, 800, 1700]\n})\n\ndf['running_total'] = df['revenue'].cumsum()\ndf['pct_share'] = (df['revenue'] / df['revenue'].sum() * 100).round(1)\nprint(df)\n",
    "solution": "import pandas as pd\ndf = pd.DataFrame({'day': [1, 2, 3, 4], 'revenue': [1000, 1500, 800, 1700]})\ndf['running_total'] = df['revenue'].cumsum()\ndf['pct_share'] = (df['revenue'] / df['revenue'].sum() * 100).round(1)\nprint(df)",
    "expectedOutput": "   day  revenue  running_total  pct_share\n0    1     1000           1000       20.0\n1    2     1500           2500       30.0\n2    3      800           3300       16.0\n3    4     1700           5000       34.0",
    "xpReward": 100
  },
  {
    "id": "sql1-1",
    "nodeId": "sql1",
    "moduleName": "SQL Fundamentals",
    "title": "Truy vấn danh sách đơn hàng có điều kiện lọc",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "SQL",
      "SELECT",
      "WHERE",
      "ORDER BY"
    ],
    "description": "Viết câu lệnh SQL truy vấn các cột `order_id`, `customer_id`, `total_amount` từ bảng `orders` thỏa mãn: `status = 'completed'` và `total_amount >= 1000000`, sắp xếp giảm dần theo số tiền.",
    "starterCode": "# Giả lập SQLite engine trong Python Sandbox\nimport sqlite3\nimport pandas as pd\n\nconn = sqlite3.connect(':memory:')\nconn.execute('''CREATE TABLE orders (order_id INT, customer_id INT, total_amount INT, status TEXT)''')\nconn.executemany('''INSERT INTO orders VALUES (?, ?, ?, ?)''', [\n    (1, 101, 1500000, 'completed'),\n    (2, 102, 800000, 'completed'),\n    (3, 103, 2300000, 'cancelled'),\n    (4, 104, 3200000, 'completed')\n])\n\nsql_query = \"\"\"\nSELECT order_id, customer_id, total_amount \nFROM orders \nWHERE status = 'completed' AND total_amount >= 1000000 \nORDER BY total_amount DESC;\n\"\"\"\n\nres = pd.read_sql_query(sql_query, conn)\nprint(res)\n",
    "solution": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE orders (order_id INT, customer_id INT, total_amount INT, status TEXT)')\nconn.executemany('INSERT INTO orders VALUES (?, ?, ?, ?)', [(1, 101, 1500000, 'completed'), (2, 102, 800000, 'completed'), (3, 103, 2300000, 'cancelled'), (4, 104, 3200000, 'completed')])\nsql_query = 'SELECT order_id, customer_id, total_amount FROM orders WHERE status = \\'completed\\' AND total_amount >= 1000000 ORDER BY total_amount DESC;'\nprint(pd.read_sql_query(sql_query, conn))",
    "expectedOutput": "   order_id  customer_id  total_amount\n0         4          104       3200000\n1         1          101       1500000",
    "xpReward": 50
  },
  {
    "id": "sql1-2",
    "nodeId": "sql1",
    "moduleName": "SQL Fundamentals",
    "title": "Tính toán giá trị đơn hàng với biểu thức CASE WHEN",
    "skill": "filtering",
    "difficulty": "Medium",
    "tags": [
      "SQL",
      "CASE WHEN",
      "Conditional Logic"
    ],
    "description": "Sử dụng mệnh đề `CASE WHEN` trong SQL để phân nhóm khách hàng (Customer Tier):\n- `total_spend >= 5000000`: 'VIP'\n- `total_spend >= 2000000`: 'Gold'\n- Còn lại: 'Standard'",
    "starterCode": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE customers (cust_id INT, name TEXT, total_spend INT)')\nconn.executemany('INSERT INTO customers VALUES (?, ?, ?)', [\n    (1, 'An', 6000000),\n    (2, 'Binh', 3500000),\n    (3, 'Cuong', 800000)\n])\n\nquery = \"\"\"\nSELECT name, total_spend,\n       CASE \n         WHEN total_spend >= 5000000 THEN 'VIP'\n         WHEN total_spend >= 2000000 THEN 'Gold'\n         ELSE 'Standard'\n       END AS customer_tier\nFROM customers;\n\"\"\"\nprint(pd.read_sql_query(query, conn))\n",
    "solution": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE customers (cust_id INT, name TEXT, total_spend INT)')\nconn.executemany('INSERT INTO customers VALUES (?, ?, ?)', [(1, 'An', 6000000), (2, 'Binh', 3500000), (3, 'Cuong', 800000)])\nquery = \"SELECT name, total_spend, CASE WHEN total_spend >= 5000000 THEN 'VIP' WHEN total_spend >= 2000000 THEN 'Gold' ELSE 'Standard' END AS customer_tier FROM customers;\"\nprint(pd.read_sql_query(query, conn))",
    "expectedOutput": "    name  total_spend customer_tier\n0     An      6000000           VIP\n1   Binh      3500000          Gold\n2  Cuong       800000      Standard",
    "xpReward": 75
  },
  {
    "id": "sql1-3",
    "nodeId": "sql1",
    "moduleName": "SQL Fundamentals",
    "title": "Lọc phân trang dữ liệu lớn với LIMIT và OFFSET",
    "skill": "filtering",
    "difficulty": "Hard",
    "tags": [
      "SQL",
      "Pagination",
      "LIMIT",
      "OFFSET"
    ],
    "description": "Khi xây dựng API hoặc ứng dụng tra cứu, phân trang là kỹ thuật bắt buộc để tối ưu hiệu năng. Hãy viết câu lệnh SQL lấy dữ liệu cho trang số 2 (Page 2), mỗi trang gồm 3 bản ghi (`LIMIT 3 OFFSET 3`).",
    "starterCode": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE logs (log_id INT, message TEXT)')\nconn.executemany('INSERT INTO logs VALUES (?, ?)', [(i, f'Log entry #{i}') for i in range(1, 11)])\n\nquery = \"SELECT * FROM logs ORDER BY log_id ASC LIMIT 3 OFFSET 3;\"\nprint(pd.read_sql_query(query, conn))\n",
    "solution": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE logs (log_id INT, message TEXT)')\nconn.executemany('INSERT INTO logs VALUES (?, ?)', [(i, f'Log entry #{i}') for i in range(1, 11)])\nquery = 'SELECT * FROM logs ORDER BY log_id ASC LIMIT 3 OFFSET 3;'\nprint(pd.read_sql_query(query, conn))",
    "expectedOutput": "   log_id        message\n0       4  Log entry #4\n1       5  Log entry #5\n2       6  Log entry #6",
    "xpReward": 100
  },
  {
    "id": "sql2-1",
    "nodeId": "sql2",
    "moduleName": "SQL Aggregation & Joins",
    "title": "Nối bảng Customers và Orders tính tổng chi tiêu",
    "skill": "merge",
    "difficulty": "Easy",
    "tags": [
      "SQL",
      "INNER JOIN",
      "GROUP BY"
    ],
    "description": "Thực hiện `INNER JOIN` giữa bảng `customers` và bảng `orders` để tính tổng tiền mua sắm của từng khách hàng.",
    "starterCode": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE customers (id INT, name TEXT)')\nconn.execute('CREATE TABLE orders (cust_id INT, amount INT)')\nconn.executemany('INSERT INTO customers VALUES (?, ?)', [(1, 'Lan'), (2, 'Minh')])\nconn.executemany('INSERT INTO orders VALUES (?, ?)', [(1, 500), (1, 300), (2, 700)])\n\nquery = \"\"\"\nSELECT c.name, SUM(o.amount) AS total_spend\nFROM customers c\nJOIN orders o ON c.id = o.cust_id\nGROUP BY c.name\nORDER BY total_spend DESC;\n\"\"\"\nprint(pd.read_sql_query(query, conn))\n",
    "solution": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE customers (id INT, name TEXT)')\nconn.execute('CREATE TABLE orders (cust_id INT, amount INT)')\nconn.executemany('INSERT INTO customers VALUES (?, ?)', [(1, 'Lan'), (2, 'Minh')])\nconn.executemany('INSERT INTO orders VALUES (?, ?)', [(1, 500), (1, 300), (2, 700)])\nquery = 'SELECT c.name, SUM(o.amount) AS total_spend FROM customers c JOIN orders o ON c.id = o.cust_id GROUP BY c.name ORDER BY total_spend DESC;'\nprint(pd.read_sql_query(query, conn))",
    "expectedOutput": "   name  total_spend\n0   Lan          800\n1  Minh          700",
    "xpReward": 50
  },
  {
    "id": "sql2-2",
    "nodeId": "sql2",
    "moduleName": "SQL Aggregation & Joins",
    "title": "Tìm Top 3 sản phẩm bán chạy mỗi tháng bằng JOIN",
    "skill": "groupby",
    "difficulty": "Medium",
    "tags": [
      "SQL",
      "LEFT JOIN",
      "HAVING"
    ],
    "description": "Viết câu truy vấn tìm các nhóm ngành hàng có tổng doanh thu vượt trên 1,000,000 bằng mệnh đề `HAVING SUM(amount) > 1000000`.",
    "starterCode": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE sales (cat TEXT, amount INT)')\nconn.executemany('INSERT INTO sales VALUES (?, ?)', [\n    ('Tech', 800000), ('Tech', 600000),\n    ('Book', 200000), ('Book', 150000),\n    ('Food', 900000), ('Food', 400000)\n])\n\nquery = \"\"\"\nSELECT cat, SUM(amount) AS total\nFROM sales\nGROUP BY cat\nHAVING SUM(amount) > 1000000\nORDER BY total DESC;\n\"\"\"\nprint(pd.read_sql_query(query, conn))\n",
    "solution": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE sales (cat TEXT, amount INT)')\nconn.executemany('INSERT INTO sales VALUES (?, ?)', [('Tech', 800000), ('Tech', 600000), ('Book', 200000), ('Book', 150000), ('Food', 900000), ('Food', 400000)])\nquery = 'SELECT cat, SUM(amount) AS total FROM sales GROUP BY cat HAVING SUM(amount) > 1000000 ORDER BY total DESC;'\nprint(pd.read_sql_query(query, conn))",
    "expectedOutput": "    cat    total\n0  Tech  1400000\n1  Food  1300000",
    "xpReward": 75
  },
  {
    "id": "sql2-3",
    "nodeId": "sql2",
    "moduleName": "SQL Aggregation & Joins",
    "title": "Phân tích tỉ lệ duy trì khách hàng với Self-Join",
    "skill": "merge",
    "difficulty": "Hard",
    "tags": [
      "SQL",
      "Self Join",
      "Cohort",
      "Retention"
    ],
    "description": "Sử dụng kỹ thuật Self-Join để tìm các khách hàng có đơn hàng lặp lại (mua hàng ở cả tháng 1 và tháng 2).",
    "starterCode": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE user_activity (user_id INT, month INT)')\nconn.executemany('INSERT INTO user_activity VALUES (?, ?)', [\n    (1, 1), (1, 2), (2, 1), (3, 2), (4, 1), (4, 2)\n])\n\nquery = \"\"\"\nSELECT DISTINCT a.user_id\nFROM user_activity a\nJOIN user_activity b ON a.user_id = b.user_id\nWHERE a.month = 1 AND b.month = 2\nORDER BY a.user_id;\n\"\"\"\nprint(pd.read_sql_query(query, conn))\n",
    "solution": "import sqlite3, pandas as pd\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE user_activity (user_id INT, month INT)')\nconn.executemany('INSERT INTO user_activity VALUES (?, ?)', [(1, 1), (1, 2), (2, 1), (3, 2), (4, 1), (4, 2)])\nquery = 'SELECT DISTINCT a.user_id FROM user_activity a JOIN user_activity b ON a.user_id = b.user_id WHERE a.month = 1 AND b.month = 2 ORDER BY a.user_id;'\nprint(pd.read_sql_query(query, conn))",
    "expectedOutput": "   user_id\n0        1\n1        4",
    "xpReward": 100
  },
  {
    "id": "eda-1",
    "nodeId": "eda",
    "moduleName": "Exploratory Data Analysis",
    "title": "Kiểm tra phân phối và bảng tóm tắt describe()",
    "skill": "statistics",
    "difficulty": "Easy",
    "tags": [
      "EDA",
      "Describe",
      "Summary Statistics"
    ],
    "description": "Trích xuất 5 chỉ số tóm tắt (Mean, Std, Min, 50%/Median, Max) của cột tuổi thọ khách hàng để nhận định nhanh hình dáng phân phối.",
    "starterCode": "import pandas as pd\n\nages = pd.Series([22, 25, 29, 31, 35, 40, 48, 55])\nsummary = ages.describe()[['mean', 'std', 'min', '50%', 'max']].round(1)\nprint(\"Age Distribution Summary:\")\nprint(summary)\n",
    "solution": "import pandas as pd\nages = pd.Series([22, 25, 29, 31, 35, 40, 48, 55])\nsummary = ages.describe()[['mean', 'std', 'min', '50%', 'max']].round(1)\nprint('Age Distribution Summary:')\nprint(summary)",
    "expectedOutput": "Age Distribution Summary:\nmean    35.6\nstd     11.0\nmin     22.0\n50%     33.0\nmax     55.0\ndtype: float64",
    "xpReward": 50
  },
  {
    "id": "eda-2",
    "nodeId": "eda",
    "moduleName": "Exploratory Data Analysis",
    "title": "Tính ma trận tương quan Pearson & Spearman",
    "skill": "statistics",
    "difficulty": "Medium",
    "tags": [
      "EDA",
      "Correlation Matrix",
      "Pearson"
    ],
    "description": "Tính toán hệ số tương quan Pearson giữa `chi tiêu quảng cáo (AdSpend)` và `doanh thu (Revenue)` để đánh giá mức độ tương quan tuyến tính.",
    "starterCode": "import pandas as pd\n\ndf = pd.DataFrame({\n    'AdSpend': [10, 20, 30, 40, 50],\n    'Revenue': [55, 95, 160, 210, 260]\n})\n\ncorr_val = df['AdSpend'].corr(df['Revenue'])\nprint(f\"Pearson Correlation: {round(corr_val, 3)}\")\n",
    "solution": "import pandas as pd\ndf = pd.DataFrame({'AdSpend': [10, 20, 30, 40, 50], 'Revenue': [55, 95, 160, 210, 260]})\ncorr_val = df['AdSpend'].corr(df['Revenue'])\nprint(f'Pearson Correlation: {round(corr_val, 3)}')",
    "expectedOutput": "Pearson Correlation: 0.999",
    "xpReward": 75
  },
  {
    "id": "eda-3",
    "nodeId": "eda",
    "moduleName": "Exploratory Data Analysis",
    "title": "Phát hiện Pattern bất thường trong hành vi người dùng",
    "skill": "outliers",
    "difficulty": "Hard",
    "tags": [
      "EDA",
      "Anomaly Detection",
      "Behavioral Analysis"
    ],
    "description": "Lọc các tài khoản có số lượng request bất thường trong 1 giờ (> 3 lần độ lệch chuẩn so với trung bình hệ thống) để gắn cờ bot/gian lận.",
    "starterCode": "import pandas as pd\n\nreqs = pd.Series([12, 15, 14, 18, 16, 150, 14, 13])\nmean = reqs.mean()\nstd = reqs.std()\n\noutliers = reqs[reqs > mean + 2 * std]\nprint(\"Detected Abnormal Activity:\", outliers.tolist())\n",
    "solution": "import pandas as pd\nreqs = pd.Series([12, 15, 14, 18, 16, 150, 14, 13])\nmean, std = reqs.mean(), reqs.std()\noutliers = reqs[reqs > mean + 2 * std]\nprint('Detected Abnormal Activity:', outliers.tolist())",
    "expectedOutput": "Detected Abnormal Activity: [150]",
    "xpReward": 100
  },
  {
    "id": "stat-1",
    "nodeId": "stat",
    "moduleName": "Statistics",
    "title": "Tính Mean, Median, Mode và Độ lệch chuẩn",
    "skill": "statistics",
    "difficulty": "Easy",
    "tags": [
      "Statistics",
      "Central Tendency",
      "Dispersion"
    ],
    "description": "Cho mẫu thời gian giao hàng (phút): `[25, 30, 30, 35, 40, 45, 60]`. Hãy tính Mean và Median.",
    "starterCode": "import numpy as np\n\ndelivery_times = [25, 30, 30, 35, 40, 45, 60]\nmean_val = np.mean(delivery_times)\nmedian_val = np.median(delivery_times)\n\nprint(f\"Mean: {round(mean_val, 2)}, Median: {median_val}\")\n",
    "solution": "import numpy as np\ndelivery_times = [25, 30, 30, 35, 40, 45, 60]\nprint(f'Mean: {round(np.mean(delivery_times), 2)}, Median: {np.median(delivery_times)}')",
    "expectedOutput": "Mean: 37.86, Median: 35.0",
    "xpReward": 50
  },
  {
    "id": "ex5",
    "nodeId": "stat",
    "moduleName": "Statistics",
    "title": "Phân tích phân phối và kiểm định Z-Score",
    "skill": "statistics",
    "difficulty": "Medium",
    "tags": [
      "Statistics",
      "Z-Score",
      "Normal Distribution"
    ],
    "description": "Chuẩn hóa cột giá trị giao dịch sang Z-Score: `Z = (X - mu) / sigma`. Điểm có Z-Score tuyệt đối > 2.5 được coi là điểm dị biệt.",
    "starterCode": "import pandas as pd\n\ns = pd.Series([100, 105, 98, 102, 110, 350, 95])\nz_scores = (s - s.mean()) / s.std()\noutliers = s[z_scores.abs() > 2.0]\n\nprint(\"Outlier values:\", outliers.tolist())\n",
    "solution": "import pandas as pd\ns = pd.Series([100, 105, 98, 102, 110, 350, 95])\nz_scores = (s - s.mean()) / s.std()\nprint('Outlier values:', s[z_scores.abs() > 2.0].tolist())",
    "expectedOutput": "Outlier values: [350]",
    "xpReward": 75
  },
  {
    "id": "stat-3",
    "nodeId": "stat",
    "moduleName": "Statistics",
    "title": "A/B Testing: Tính P-Value và khoảng tin cậy 95%",
    "skill": "statistics",
    "difficulty": "Hard",
    "tags": [
      "Statistics",
      "Hypothesis Testing",
      "A/B Testing"
    ],
    "description": "So sánh tỉ lệ chuyển đổi giữa nhóm Control A và Variant B trong chiến dịch A/B testing để kết luận kết quả có ý nghĩa thống kê hay không.",
    "starterCode": "conv_a = 0.12\nconv_b = 0.16\nuplift = (conv_b - conv_a) / conv_a * 100\np_value = 0.018 # Giả định kết quả từ Chi-squared test\n\nprint(f\"Relative Uplift: +{round(uplift, 1)}%\")\nprint(f\"P-Value: {p_value} -> Statistically Significant (p < 0.05)\")\n",
    "solution": "conv_a, conv_b, p_value = 0.12, 0.16, 0.018\nprint(f'Relative Uplift: +{round((conv_b - conv_a)/conv_a * 100, 1)}%')\nprint(f'P-Value: {p_value} -> Statistically Significant (p < 0.05)')",
    "expectedOutput": "Relative Uplift: +33.3%\nP-Value: 0.018 -> Statistically Significant (p < 0.05)",
    "xpReward": 100
  },
  {
    "id": "viz-1",
    "nodeId": "viz",
    "moduleName": "Data Visualization",
    "title": "Vẽ biểu đồ Bar Chart so sánh doanh thu các kênh",
    "skill": "outliers",
    "difficulty": "Easy",
    "tags": [
      "Visualization",
      "Matplotlib",
      "Bar Chart"
    ],
    "description": "Chuẩn bị dữ liệu tổng hợp để vẽ biểu đồ thanh ngang so sánh doanh thu giữa các kênh bán hàng (Shopee, Lazada, TikTok Shop, Website).",
    "starterCode": "channels = ['Shopee', 'TikTok Shop', 'Lazada', 'Website']\nrev = [450, 380, 210, 190]\n\nfor ch, r in sorted(zip(channels, rev), key=lambda x: x[1], reverse=True):\n    print(f\"{ch:12}: {'█' * (r // 30)} ({r}M)\")\n",
    "solution": "channels = ['Shopee', 'TikTok Shop', 'Lazada', 'Website']\nrev = [450, 380, 210, 190]\nfor ch, r in sorted(zip(channels, rev), key=lambda x: x[1], reverse=True):\n    print(f\"{ch:12}: {'█' * (r // 30)} ({r}M)\")",
    "expectedOutput": "Shopee      : ███████████████ (450M)\nTikTok Shop : ████████████ (380M)\nLazada      : ███████ (210M)\nWebsite     : ██████ (190M)",
    "xpReward": 50
  },
  {
    "id": "ex6",
    "nodeId": "viz",
    "moduleName": "Data Visualization",
    "title": "Phát hiện ngoại lệ (Outliers) bằng Boxplot và IQR",
    "skill": "outliers",
    "difficulty": "Medium",
    "tags": [
      "Visualization",
      "IQR",
      "Boxplot",
      "Outliers"
    ],
    "description": "Sử dụng quy tắc IQR (Interquartile Range) để tính ngưỡng ranh giới trên `Q3 + 1.5 * IQR` và lọc các giá trị vượt ngưỡng.",
    "starterCode": "import pandas as pd\n\ns = pd.Series([10, 12, 14, 15, 16, 18, 20, 22, 65])\nq1 = s.quantile(0.25)\nq3 = s.quantile(0.75)\niqr = q3 - q1\nupper_fence = q3 + 1.5 * iqr\n\noutliers = s[s > upper_fence]\nprint(\"IQR Upper Fence:\", upper_fence)\nprint(\"Detected Outliers:\", outliers.tolist())\n",
    "solution": "import pandas as pd\ns = pd.Series([10, 12, 14, 15, 16, 18, 20, 22, 65])\nq1, q3 = s.quantile(0.25), s.quantile(0.75)\nupper_fence = q3 + 1.5 * (q3 - q1)\nprint('IQR Upper Fence:', upper_fence)\nprint('Detected Outliers:', s[s > upper_fence].tolist())",
    "expectedOutput": "IQR Upper Fence: 32.0\nDetected Outliers: [65]",
    "xpReward": 75
  },
  {
    "id": "viz-3",
    "nodeId": "viz",
    "moduleName": "Data Visualization",
    "title": "Xây dựng Dashboard trực quan hóa đa biểu đồ Subplots",
    "skill": "outliers",
    "difficulty": "Hard",
    "tags": [
      "Visualization",
      "Subplots",
      "Dashboard"
    ],
    "description": "Tạo lưới đồ thị đa chiều 2x2 gồm Trend line, Bar chart, Scatter plot và Distribution histogram.",
    "starterCode": "metrics = {\n    'Quarter': ['Q1', 'Q2', 'Q3', 'Q4'],\n    'CAC': [15, 14, 12, 10],\n    'LTV': [45, 50, 58, 65]\n}\n\nltv_cac_ratio = [l / c for l, c in zip(metrics['LTV'], metrics['CAC'])]\nprint(\"LTV / CAC Ratio by Quarter:\")\nfor q, ratio in zip(metrics['Quarter'], ltv_cac_ratio):\n    print(f\"{q}: {round(ratio, 2)}x\")\n",
    "solution": "metrics = {'Quarter': ['Q1', 'Q2', 'Q3', 'Q4'], 'CAC': [15, 14, 12, 10], 'LTV': [45, 50, 58, 65]}\nprint('LTV / CAC Ratio by Quarter:')\nfor q, ratio in zip(metrics['Quarter'], [l/c for l, c in zip(metrics['LTV'], metrics['CAC'])]):\n    print(f'{q}: {round(ratio, 2)}x')",
    "expectedOutput": "LTV / CAC Ratio by Quarter:\nQ1: 3.0x\nQ2: 3.57x\nQ3: 4.83x\nQ4: 6.5x",
    "xpReward": 100
  },
  {
    "id": "bm-1",
    "nodeId": "bm",
    "moduleName": "Business Metrics",
    "title": "Tính toán tỉ lệ chuyển đổi Conversion Rate & AOV",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "Business",
      "KPIs",
      "Conversion Rate",
      "AOV"
    ],
    "description": "Tính 2 chỉ số cốt lõi trong E-commerce:\n1. Conversion Rate (CR) = `(Orders / Visitors) * 100`\n2. Average Order Value (AOV) = `Total Revenue / Orders`",
    "starterCode": "visitors = 50000\norders = 1750\ntotal_revenue = 875000000\n\ncr = (orders / visitors) * 100\naov = total_revenue / orders\n\nprint(f\"Conversion Rate: {cr:.2f}%\")\nprint(f\"Average Order Value: {int(aov):,} VNĐ\")\n",
    "solution": "visitors, orders, total_revenue = 50000, 1750, 875000000\nprint(f'Conversion Rate: {(orders / visitors) * 100:.2f}%')\nprint(f'Average Order Value: {int(total_revenue / orders):,} VNĐ')",
    "expectedOutput": "Conversion Rate: 3.50%\nAverage Order Value: 500,000 VNĐ",
    "xpReward": 50
  },
  {
    "id": "bm-2",
    "nodeId": "bm",
    "moduleName": "Business Metrics",
    "title": "Xây dựng bảng phân tích Cohort Retention theo tháng",
    "skill": "groupby",
    "difficulty": "Medium",
    "tags": [
      "Business",
      "Cohort Analysis",
      "Retention Rate"
    ],
    "description": "Tính tỉ lệ giữ chân khách hàng (Retention Rate %) qua các tháng M0, M1, M2 của Cohort tháng 1.",
    "starterCode": "cohort_sizes = 1000\nactive_users = [1000, 420, 310]\n\nretention_rates = [(u / cohort_sizes) * 100 for u in active_users]\nprint(\"Cohort Retention Rates:\")\nfor m, r in enumerate(retention_rates):\n    print(f\"Month {m}: {r:.1f}%\")\n",
    "solution": "cohort_sizes, active_users = 1000, [1000, 420, 310]\nprint('Cohort Retention Rates:')\nfor m, r in enumerate([(u / cohort_sizes) * 100 for u in active_users]):\n    print(f'Month {m}: {r:.1f}%')",
    "expectedOutput": "Cohort Retention Rates:\nMonth 0: 100.0%\nMonth 1: 42.0%\nMonth 2: 31.0%",
    "xpReward": 75
  },
  {
    "id": "bm-3",
    "nodeId": "bm",
    "moduleName": "Business Metrics",
    "title": "Mô hình dự báo Customer Lifetime Value (LTV) theo nhóm",
    "skill": "statistics",
    "difficulty": "Hard",
    "tags": [
      "Business",
      "LTV Modeling",
      "Churn Rate"
    ],
    "description": "Công thức tính LTV đơn giản: `LTV = (ARPU * Gross Margin) / Churn Rate`. Dự báo LTV cho phân khúc khách hàng B2B và B2C.",
    "starterCode": "arpu = 250000 # Doanh thu trung bình/user/tháng\nmargin = 0.65  # Tỉ suất lợi nhuận gộp\nchurn = 0.05   # Tỉ lệ rời bỏ 5%/tháng\n\nltv = (arpu * margin) / churn\nprint(f\"Estimated Customer LTV: {int(ltv):,} VNĐ\")\n",
    "solution": "arpu, margin, churn = 250000, 0.65, 0.05\nprint(f'Estimated Customer LTV: {int((arpu * margin) / churn):,} VNĐ')",
    "expectedOutput": "Estimated Customer LTV: 3,250,000 VNĐ",
    "xpReward": 100
  },
  {
    "id": "story-1",
    "nodeId": "story",
    "moduleName": "Data Storytelling",
    "title": "Tóm tắt 3 Key Insights từ biểu đồ tăng trưởng",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "Storytelling",
      "Insights",
      "Executive Briefing"
    ],
    "description": "Chuyển đổi bảng dữ liệu thô thành 3 luận điểm cốt lõi (Actionable Insights) có số liệu minh chứng cụ thể cho ban giám đốc.",
    "starterCode": "insights = [\n    \"1. Kênh TikTok Shop tăng trưởng +120% MoM, trở thành động lực chính quý 3.\",\n    \"2. Tỉ lệ hoàn đơn ngành Thời trang ở mức 14%, cao gấp đôi ngưỡng tiêu chuẩn 7%.\",\n    \"3. Khách hàng thân thiết (VIP) đóng góp 54% tổng doanh thu dù chỉ chiếm 8% số lượng.\"\n]\n\nprint(\"=== EXECUTIVE SUMMARY INSIGHTS ===\")\nfor item in insights:\n    print(item)\n",
    "solution": "insights = ['1. Kênh TikTok Shop tăng trưởng +120% MoM, trở thành động lực chính quý 3.', '2. Tỉ lệ hoàn đơn ngành Thời trang ở mức 14%, cao gấp đôi ngưỡng tiêu chuẩn 7%.', '3. Khách hàng thân thiết (VIP) đóng góp 54% tổng doanh thu dù chỉ chiếm 8% số lượng.']\nprint('=== EXECUTIVE SUMMARY INSIGHTS ===')\nfor item in insights: print(item)",
    "expectedOutput": "=== EXECUTIVE SUMMARY INSIGHTS ===\n1. Kênh TikTok Shop tăng trưởng +120% MoM, trở thành động lực chính quý 3.\n2. Tỉ lệ hoàn đơn ngành Thời trang ở mức 14%, cao gấp đôi ngưỡng tiêu chuẩn 7%.\n3. Khách hàng thân thiết (VIP) đóng góp 54% tổng doanh thu dù chỉ chiếm 8% số lượng.",
    "xpReward": 50
  },
  {
    "id": "story-2",
    "nodeId": "story",
    "moduleName": "Data Storytelling",
    "title": "Soạn thảo Executive Summary báo cáo doanh thu quý",
    "skill": "filtering",
    "difficulty": "Medium",
    "tags": [
      "Storytelling",
      "Business Writing",
      "Quarterly Report"
    ],
    "description": "Viết đoạn tóm tắt cấu trúc SCQA (Situation - Complication - Question - Answer) cho cuộc họp cổ đông quý.",
    "starterCode": "report = {\n    'Target': '10.0B',\n    'Achieved': '10.8B',\n    'Achievement_Rate': '108%',\n    'Key_Driver': 'Bùng nổ chiến dịch Megasale tháng 9'\n}\n\nprint(f\"Q3 Performance: Đạt {report['Achieved']} ({report['Achievement_Rate']} KPI) nhờ {report['Key_Driver']}.\")\n",
    "solution": "report = {'Target': '10.0B', 'Achieved': '10.8B', 'Achievement_Rate': '108%', 'Key_Driver': 'Bùng nổ chiến dịch Megasale tháng 9'}\nprint(f\"Q3 Performance: Đạt {report['Achieved']} ({report['Achievement_Rate']} KPI) nhờ {report['Key_Driver']}.\")",
    "expectedOutput": "Q3 Performance: Đạt 10.8B (108% KPI) nhờ Bùng nổ chiến dịch Megasale tháng 9.",
    "xpReward": 75
  },
  {
    "id": "story-3",
    "nodeId": "story",
    "moduleName": "Data Storytelling",
    "title": "Xây dựng bài thuyết trình đề xuất tối ưu chi phí vận hành",
    "skill": "statistics",
    "difficulty": "Hard",
    "tags": [
      "Storytelling",
      "Decision Making",
      "Cost Optimization"
    ],
    "description": "Xây dựng ma trận chi phí - lợi ích (Cost-Benefit Analysis) nhằm bảo vệ phương án tự động hóa kho hàng với CFO.",
    "starterCode": "current_cost = 1200000000 # 1.2 tỷ/năm\nauto_cost = 450000000      # 450 triệu/năm\nsavings = current_cost - auto_cost\nroi = (savings / 800000000) * 100 # Vốn đầu tư 800tr\n\nprint(f\"Tiết kiệm hàng năm: {savings:,} VNĐ\")\nprint(f\"ROI năm đầu tiên: {roi:.1f}%\")\n",
    "solution": "current_cost, auto_cost = 1200000000, 450000000\nsavings = current_cost - auto_cost\nroi = (savings / 800000000) * 100\nprint(f'Tiết kiệm hàng năm: {savings:,} VNĐ')\nprint(f'ROI năm đầu tiên: {roi:.1f}%')",
    "expectedOutput": "Tiết kiệm hàng năm: 750,000,000 VNĐ\nROI năm đầu tiên: 93.8%",
    "xpReward": 100
  },
  {
    "id": "proj-1",
    "nodeId": "proj",
    "moduleName": "Final DA Project",
    "title": "Thiết lập cấu trúc thư mục và tài liệu README dự án",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "Project",
      "Architecture",
      "Best Practices"
    ],
    "description": "Một dự án Data tiêu chuẩn cần có cấu trúc: `data/`, `notebooks/`, `src/`, `reports/` và `README.md`.",
    "starterCode": "folders = ['data/raw', 'data/processed', 'notebooks', 'src', 'reports/figures']\nfor f in folders:\n    print(f\"[DIR CREATED]: {f}\")\nprint(\"Project repository structure initialized successfully!\")\n",
    "solution": "folders = ['data/raw', 'data/processed', 'notebooks', 'src', 'reports/figures']\nfor f in folders: print(f\"[DIR CREATED]: {f}\")\nprint('Project repository structure initialized successfully!')",
    "expectedOutput": "[DIR CREATED]: data/raw\n[DIR CREATED]: data/processed\n[DIR CREATED]: notebooks\n[DIR CREATED]: src\n[DIR CREATED]: reports/figures\nProject repository structure initialized successfully!",
    "xpReward": 50
  },
  {
    "id": "proj-2",
    "nodeId": "proj",
    "moduleName": "Final DA Project",
    "title": "Pipeline làm sạch và tổng hợp bộ dữ liệu 100K dòng",
    "skill": "merge",
    "difficulty": "Medium",
    "tags": [
      "Project",
      "ETL Pipeline",
      "Data Engineering"
    ],
    "description": "Viết pipeline hàm `run_etl(df)` gồm: xóa duplicate, fill missing value, tính thêm cột `net_value`, trả về dataset sạch.",
    "starterCode": "import pandas as pd\n\ndef run_etl_pipeline(raw_df):\n    df = raw_df.drop_duplicates().copy()\n    df['amount'] = df['amount'].fillna(0)\n    df['net_value'] = df['amount'] * 0.9\n    return df\n\ntest_df = pd.DataFrame({'id': [1, 2, 2], 'amount': [100, None, 200]})\nclean = run_etl_pipeline(test_df)\nprint(\"Processed rows:\", len(clean))\nprint(clean)\n",
    "solution": "import pandas as pd\ndef run_etl_pipeline(raw_df):\n    df = raw_df.drop_duplicates().copy()\n    df['amount'] = df['amount'].fillna(0)\n    df['net_value'] = df['amount'] * 0.9\n    return df\nclean = run_etl_pipeline(pd.DataFrame({'id': [1, 2, 2], 'amount': [100, None, 200]}))\nprint('Processed rows:', len(clean))\nprint(clean)",
    "expectedOutput": "Processed rows: 2\n   id  amount  net_value\n0   1   100.0       90.0\n1   2     0.0        0.0",
    "xpReward": 75
  },
  {
    "id": "proj-3",
    "nodeId": "proj",
    "moduleName": "Final DA Project",
    "title": "Báo cáo phân tích chuyên sâu kèm bộ biểu đồ trực quan",
    "skill": "statistics",
    "difficulty": "Hard",
    "tags": [
      "Project",
      "Capstone",
      "Comprehensive Report"
    ],
    "description": "Tổng hợp kết quả cuối cùng của dự án Capstone với đầy đủ các chỉ số: Total Volume, Churn Rate, Projected Revenue Growth.",
    "starterCode": "capstone_summary = {\n    'Project_Name': 'E-Commerce Churn & Revenue Optimization',\n    'Dataset_Size': '125,000 records',\n    'Model_Accuracy': '89.4%',\n    'Business_Impact': '+1.2B VNĐ Projected Savings'\n}\n\nfor k, v in capstone_summary.items():\n    print(f\"{k.replace('_', ' ')}: {v}\")\n",
    "solution": "capstone_summary = {'Project_Name': 'E-Commerce Churn & Revenue Optimization', 'Dataset_Size': '125,000 records', 'Model_Accuracy': '89.4%', 'Business_Impact': '+1.2B VNĐ Projected Savings'}\nfor k, v in capstone_summary.items(): print(f\"{k.replace('_', ' ')}: {v}\")",
    "expectedOutput": "Project Name: E-Commerce Churn & Revenue Optimization\nDataset Size: 125,000 records\nModel Accuracy: 89.4%\nBusiness Impact: +1.2B VNĐ Projected Savings",
    "xpReward": 100
  },
  {
    "id": "port-1",
    "nodeId": "port",
    "moduleName": "Portfolio",
    "title": "Viết Case Study tóm tắt dự án nổi bật nhất",
    "skill": "filtering",
    "difficulty": "Easy",
    "tags": [
      "Portfolio",
      "Case Study",
      "STAR Method"
    ],
    "description": "Cấu trúc một Case Study gây ấn tượng theo mô hình STAR (Situation - Task - Action - Result).",
    "starterCode": "star_model = {\n    'Situation': 'Doanh nghiệp mất 12% khách hàng trung thành mỗi quý.',\n    'Task': 'Xác định nguyên nhân gốc rễ và đề xuất giải pháp giảm churn.',\n    'Action': 'Phân tích dữ liệu 50K đơn hàng bằng Python/Pandas, tìm ra điểm gãy giao vận.',\n    'Result': 'Giảm churn từ 12% xuống 6.5%, bảo vệ 800M doanh thu.'\n}\n\nfor stage, content in star_model.items():\n    print(f\"[{stage.upper()}]: {content}\")\n",
    "solution": "star_model = {'Situation': 'Doanh nghiệp mất 12% khách hàng trung thành mỗi quý.', 'Task': 'Xác định nguyên nhân gốc rễ và đề xuất giải pháp giảm churn.', 'Action': 'Phân tích dữ liệu 50K đơn hàng bằng Python/Pandas, tìm ra điểm gãy giao vận.', 'Result': 'Giảm churn từ 12% xuống 6.5%, bảo vệ 800M doanh thu.'}\nfor stage, content in star_model.items(): print(f\"[{stage.upper()}]: {content}\")",
    "expectedOutput": "[SITUATION]: Doanh nghiệp mất 12% khách hàng trung thành mỗi quý.\n[TASK]: Xác định nguyên nhân gốc rễ và đề xuất giải pháp giảm churn.\n[ACTION]: Phân tích dữ liệu 50K đơn hàng bằng Python/Pandas, tìm ra điểm gãy giao vận.\n[RESULT]: Giảm churn từ 12% xuống 6.5%, bảo vệ 800M doanh thu.",
    "xpReward": 50
  },
  {
    "id": "port-2",
    "nodeId": "port",
    "moduleName": "Portfolio",
    "title": "Đóng gói mã nguồn và file hướng dẫn tái hiện (Reproducibility)",
    "skill": "filtering",
    "difficulty": "Medium",
    "tags": [
      "Portfolio",
      "Reproducibility",
      "requirements.txt"
    ],
    "description": "Tạo danh sách các thư viện cần thiết và lệnh cài đặt môi trường ảo `requirements.txt` chuẩn cho nhà tuyển dụng chạy thử code của bạn.",
    "starterCode": "packages = ['pandas>=2.0.0', 'numpy>=1.24.0', 'matplotlib>=3.7.0', 'seaborn>=0.12.0']\nprint(\"# requirements.txt generated\")\nfor pkg in packages:\n    print(pkg)\n",
    "solution": "packages = ['pandas>=2.0.0', 'numpy>=1.24.0', 'matplotlib>=3.7.0', 'seaborn>=0.12.0']\nprint('# requirements.txt generated')\nfor pkg in packages: print(pkg)",
    "expectedOutput": "# requirements.txt generated\npandas>=2.0.0\nnumpy>=1.24.0\nmatplotlib>=3.7.0\nseaborn>=0.12.0",
    "xpReward": 75
  },
  {
    "id": "port-3",
    "nodeId": "port",
    "moduleName": "Portfolio",
    "title": "Tạo trang web Portfolio cá nhân trên GitHub Pages",
    "skill": "statistics",
    "difficulty": "Hard",
    "tags": [
      "Portfolio",
      "GitHub Pages",
      "Personal Branding"
    ],
    "description": "Khởi tạo file cấu hình siêu dữ liệu `_config.yml` cho Jekyll/GitHub Pages nhằm tối ưu SEO cá nhân của một Data Analyst chuyên nghiệp.",
    "starterCode": "portfolio_cfg = {\n    'title': 'Nguyen Minh Khoa - Data Analyst Portfolio',\n    'theme': 'minimal-data-theme',\n    'github_username': 'minhkhoa-data',\n    'live_projects_count': 5\n}\n\nprint(\"=== PORTFOLIO SITE CONFIG READY ===\")\nfor k, v in portfolio_cfg.items():\n    print(f\"{k}: {v}\")\n",
    "solution": "portfolio_cfg = {'title': 'Nguyen Minh Khoa - Data Analyst Portfolio', 'theme': 'minimal-data-theme', 'github_username': 'minhkhoa-data', 'live_projects_count': 5}\nprint('=== PORTFOLIO SITE CONFIG READY ===')\nfor k, v in portfolio_cfg.items(): print(f'{k}: {v}')",
    "expectedOutput": "=== PORTFOLIO SITE CONFIG READY ===\ntitle: Nguyen Minh Khoa - Data Analyst Portfolio\ntheme: minimal-data-theme\ngithub_username: minhkhoa-data\nlive_projects_count: 5",
    "xpReward": 100
  }
];

export const ROADMAP_NODES = [
  { id: 'py', label: 'Python\nFundamentals', icon: '🐍', x: 200, y: 80, deps: [], skill: 'filtering', color: 'A' },
  { id: 'np', label: 'NumPy', icon: '🔢', x: 100, y: 220, deps: ['py'], skill: 'statistics', color: 'B' },
  { id: 'pd', label: 'Pandas', icon: '🐼', x: 300, y: 220, deps: ['py'], skill: 'filtering', color: 'B' },
  { id: 'dc', label: 'Data Cleaning', icon: '🧹', x: 200, y: 360, deps: ['np', 'pd'], skill: 'missing_values', color: 'C' },
  { id: 'dt', label: 'Data\nTransformation', icon: '⚙️', x: 400, y: 360, deps: ['pd'], skill: 'groupby', color: 'C' },
  { id: 'sql1', label: 'SQL\nFundamentals', icon: '🗄️', x: 580, y: 180, deps: [], skill: null, color: 'A' },
  { id: 'sql2', label: 'SQL Aggregation\n& Joins', icon: '🔗', x: 580, y: 340, deps: ['sql1'], skill: null, color: 'B' },
  { id: 'eda', label: 'Exploratory\nData Analysis', icon: '🔍', x: 280, y: 490, deps: ['dc', 'dt'], skill: 'statistics', color: 'D' },
  { id: 'stat', label: 'Statistics', icon: '📊', x: 500, y: 490, deps: ['np', 'sql2'], skill: 'statistics', color: 'D' },
  { id: 'viz', label: 'Data\nVisualization', icon: '📈', x: 180, y: 620, deps: ['eda'], skill: 'outliers', color: 'E' },
  { id: 'bm', label: 'Business\nMetrics', icon: '💼', x: 400, y: 620, deps: ['eda', 'stat'], skill: null, color: 'E' },
  { id: 'story', label: 'Data\nStorytelling', icon: '📢', x: 290, y: 750, deps: ['viz', 'bm'], skill: null, color: 'F' },
  { id: 'proj', label: 'Final DA\nProject', icon: '🎯', x: 290, y: 880, deps: ['story'], skill: null, color: 'G' },
  { id: 'port', label: 'Portfolio', icon: '🏆', x: 290, y: 1000, deps: ['proj'], skill: null, color: 'G' },
];


// ── Node Descriptions ──────────────────────────
export const NODE_DESCRIPTIONS = {
  py: { title: 'Python Fundamentals', desc: 'Nắm vững syntax Python, data types, loops, functions và OOP cơ bản.' },
  np: { title: 'NumPy', desc: 'Array operations, mathematical functions, broadcasting và linear algebra cơ bản.' },
  pd: { title: 'Pandas', desc: 'DataFrame, Series, indexing, filtering, groupby và data manipulation.' },
  dc: { title: 'Data Cleaning', desc: 'Xử lý missing values, duplicates, data type conversion và validation.' },
  dt: { title: 'Data Transformation', desc: 'Reshape, pivot, merge, window functions và feature engineering.' },
  sql1: { title: 'SQL Fundamentals', desc: 'SELECT, WHERE, ORDER BY, LIMIT và basic filtering.' },
  sql2: { title: 'SQL Aggregation & Joins', desc: 'GROUP BY, HAVING, các loại JOIN và subqueries.' },
  eda: { title: 'Exploratory Data Analysis', desc: 'Distribution analysis, correlation, pattern detection và hypothesis.' },
  stat: { title: 'Statistics', desc: 'Descriptive stats, probability, hypothesis testing và confidence intervals.' },
  viz: { title: 'Data Visualization', desc: 'Matplotlib, Seaborn, Plotly và nguyên tắc thiết kế chart.' },
  bm: { title: 'Business Metrics', desc: 'KPIs, cohort analysis, funnel analysis và business intelligence.' },
  story: { title: 'Data Storytelling', desc: 'Cách trình bày insight, xây dựng narrative và giao tiếp với stakeholders.' },
  proj: { title: 'Final DA Project', desc: 'Dự án thực tế end-to-end từ raw data đến insight và báo cáo.' },
  port: { title: 'Portfolio', desc: 'Xây dựng GitHub portfolio, viết case study và chuẩn bị CV Data Analyst.' },
};

export const NODE_PRACTICE_PROBLEMS = {
  py: [
    { id: 'py-1', title: 'Khai báo biến và ép kiểu dữ liệu Python cơ bản', difficulty: 'Easy', labUrl: '#practice?ex=py-1' },
    { id: 'py-2', title: 'Xử lý chuỗi và List Comprehension nâng cao', difficulty: 'Medium', labUrl: '#practice?ex=py-2' },
    { id: 'py-3', title: 'Tối ưu hóa thuật toán với Generator & Lambda', difficulty: 'Hard', labUrl: '#practice?ex=py-3' },
  ],
  np: [
    { id: 'np-1', title: 'Khởi tạo mảng NumPy và Reshape ma trận 2D', difficulty: 'Easy', labUrl: '#practice?ex=np-1' },
    { id: 'np-2', title: 'Thao tác Broadcasting và Matrix Multiplication', difficulty: 'Medium', labUrl: '#practice?ex=np-2' },
    { id: 'np-3', title: 'Tối ưu tính toán đại số tuyến tính với numpy.linalg', difficulty: 'Hard', labUrl: '#practice?ex=np-3' },
  ],
  pd: [
    { id: 'ex1', title: 'Lọc dữ liệu với điều kiện phức hợp', difficulty: 'Easy', labUrl: '#practice?ex=ex1' },
    { id: 'pd-2', title: 'Indexing đa tầng (MultiIndex) và Slicing nâng cao', difficulty: 'Medium', labUrl: '#practice?ex=pd-2' },
    { id: 'pd-3', title: 'Xử lý dữ liệu chuỗi thời gian (TimeSeries Resampling)', difficulty: 'Hard', labUrl: '#practice?ex=pd-3' },
  ],
  dc: [
    { id: 'ex2', title: 'Xử lý Missing Values đa dạng chiến lược', difficulty: 'Easy', labUrl: '#practice?ex=ex2' },
    { id: 'dc-2', title: 'Chuẩn hóa chuỗi văn bản và định dạng ngày tháng', difficulty: 'Medium', labUrl: '#practice?ex=dc-2' },
    { id: 'dc-3', title: 'Khử trùng lặp và làm sạch bộ dữ liệu đa nguồn', difficulty: 'Hard', labUrl: '#practice?ex=dc-3' },
  ],
  dt: [
    { id: 'ex3', title: 'GroupBy và Tổng hợp doanh thu chi nhánh', difficulty: 'Easy', labUrl: '#practice?ex=ex3' },
    { id: 'ex4', title: 'Merge và Nối bảng dữ liệu khách hàng', difficulty: 'Medium', labUrl: '#practice?ex=ex4' },
    { id: 'dt-3', title: 'Window Functions và tính toán Running Total bằng Pandas', difficulty: 'Hard', labUrl: '#practice?ex=dt-3' },
  ],
  sql1: [
    { id: 'sql1-1', title: 'Truy vấn danh sách đơn hàng có điều kiện lọc', difficulty: 'Easy', labUrl: '#practice?ex=sql1-1' },
    { id: 'sql1-2', title: 'Tính toán giá trị đơn hàng với biểu thức CASE WHEN', difficulty: 'Medium', labUrl: '#practice?ex=sql1-2' },
    { id: 'sql1-3', title: 'Lọc phân trang dữ liệu lớn với LIMIT và OFFSET', difficulty: 'Hard', labUrl: '#practice?ex=sql1-3' },
  ],
  sql2: [
    { id: 'sql2-1', title: 'Nối bảng Customers và Orders tính tổng chi tiêu', difficulty: 'Easy', labUrl: '#practice?ex=sql2-1' },
    { id: 'sql2-2', title: 'Tìm Top 3 sản phẩm bán chạy mỗi tháng bằng JOIN', difficulty: 'Medium', labUrl: '#practice?ex=sql2-2' },
    { id: 'sql2-3', title: 'Phân tích tỉ lệ duy trì khách hàng với Self-Join', difficulty: 'Hard', labUrl: '#practice?ex=sql2-3' },
  ],
  eda: [
    { id: 'eda-1', title: 'Kiểm tra phân phối và bảng tóm tắt describe()', difficulty: 'Easy', labUrl: '#practice?ex=eda-1' },
    { id: 'eda-2', title: 'Tính ma trận tương quan Pearson & Spearman', difficulty: 'Medium', labUrl: '#practice?ex=eda-2' },
    { id: 'eda-3', title: 'Phát hiện Pattern bất thường trong hành vi người dùng', difficulty: 'Hard', labUrl: '#practice?ex=eda-3' },
  ],
  stat: [
    { id: 'stat-1', title: 'Tính Mean, Median, Mode và Độ lệch chuẩn', difficulty: 'Easy', labUrl: '#practice?ex=stat-1' },
    { id: 'ex5', title: 'Phân tích phân phối và kiểm định Z-Score', difficulty: 'Medium', labUrl: '#practice?ex=ex5' },
    { id: 'stat-3', title: 'A/B Testing: Tính P-Value và khoảng tin cậy 95%', difficulty: 'Hard', labUrl: '#practice?ex=stat-3' },
  ],
  viz: [
    { id: 'viz-1', title: 'Vẽ biểu đồ Bar Chart so sánh doanh thu các kênh', difficulty: 'Easy', labUrl: '#practice?ex=viz-1' },
    { id: 'ex6', title: 'Phát hiện ngoại lệ (Outliers) bằng Boxplot và IQR', difficulty: 'Medium', labUrl: '#practice?ex=ex6' },
    { id: 'viz-3', title: 'Xây dựng Dashboard trực quan hóa đa biểu đồ Subplots', difficulty: 'Hard', labUrl: '#practice?ex=viz-3' },
  ],
  bm: [
    { id: 'bm-1', title: 'Tính toán tỉ lệ chuyển đổi Conversion Rate & AOV', difficulty: 'Easy', labUrl: '#practice?ex=bm-1' },
    { id: 'bm-2', title: 'Xây dựng bảng phân tích Cohort Retention theo tháng', difficulty: 'Medium', labUrl: '#practice?ex=bm-2' },
    { id: 'bm-3', title: 'Mô hình dự báo Customer Lifetime Value (LTV) theo nhóm', difficulty: 'Hard', labUrl: '#practice?ex=bm-3' },
  ],
  story: [
    { id: 'story-1', title: 'Tóm tắt 3 Key Insights từ biểu đồ tăng trưởng', difficulty: 'Easy', labUrl: '#practice?ex=story-1' },
    { id: 'story-2', title: 'Soạn thảo Executive Summary báo cáo doanh thu quý', difficulty: 'Medium', labUrl: '#practice?ex=story-2' },
    { id: 'story-3', title: 'Xây dựng bài thuyết trình đề xuất tối ưu chi phí vận hành', difficulty: 'Hard', labUrl: '#practice?ex=story-3' },
  ],
  proj: [
    { id: 'proj-1', title: 'Thiết lập cấu trúc thư mục và tài liệu README dự án', difficulty: 'Easy', labUrl: '#practice?ex=proj-1' },
    { id: 'proj-2', title: 'Pipeline làm sạch và tổng hợp bộ dữ liệu 100K dòng', difficulty: 'Medium', labUrl: '#practice?ex=proj-2' },
    { id: 'proj-3', title: 'Báo cáo phân tích chuyên sâu kèm bộ biểu đồ trực quan', difficulty: 'Hard', labUrl: '#practice?ex=proj-3' },
  ],
  port: [
    { id: 'port-1', title: 'Viết Case Study tóm tắt dự án nổi bật nhất', difficulty: 'Easy', labUrl: '#practice?ex=port-1' },
    { id: 'port-2', title: 'Đóng gói mã nguồn và file hướng dẫn tái hiện (Reproducibility)', difficulty: 'Medium', labUrl: '#practice?ex=port-2' },
    { id: 'port-3', title: 'Tạo trang web Portfolio cá nhân trên GitHub Pages', difficulty: 'Hard', labUrl: '#practice?ex=port-3' },
  ],
};

// ── Node Recommended Courses & Prerequisites ───
export const NODE_RECOMMENDED_COURSES = {
  py: [
    { id: 'c-py-1', title: 'Python Syntax & Data Types', category: 'W3Schools Python Tutorial', duration: '35 phút', url: 'https://www.w3schools.com/python/default.asp' },
    { id: 'c-py-2', title: 'Khóa học Python căn bản từ A-Z', category: 'YouTube • Programming with Mosh', duration: '60 phút', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' },
  ],
  np: [
    { id: 'c-np-1', title: 'NumPy Arrays & Vectorized Computing', category: 'W3Schools NumPy Tutorial', duration: '40 phút', url: 'https://www.w3schools.com/python/numpy/default.asp' },
    { id: 'c-np-2', title: 'NumPy Full Course cho Data Science', category: 'YouTube • freeCodeCamp', duration: '55 phút', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI' },
  ],
  pd: [
    { id: 'c-pd-1', title: 'Pandas Series & DataFrames Intro', category: 'W3Schools Pandas Tutorial', duration: '45 phút', url: 'https://www.w3schools.com/python/pandas/default.asp' },
    { id: 'c-pd-2', title: 'Pandas Data Analysis Thực Chiến', category: 'YouTube • Keith Galli', duration: '60 phút', url: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
  ],
  dc: [
    { id: 'c-dc-1', title: 'Cleaning Empty Cells & Missing Data', category: 'W3Schools Data Cleaning', duration: '40 phút', url: 'https://www.w3schools.com/python/pandas/pandas_cleaning_empty_cells.asp' },
    { id: 'c-dc-2', title: 'Data Cleaning thực chiến với Pandas', category: 'YouTube • Alex The Analyst', duration: '45 phút', url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw' },
  ],
  dt: [
    { id: 'c-dt-1', title: 'Pandas Correlations & Grouping', category: 'W3Schools Pandas Analysis', duration: '50 phút', url: 'https://www.w3schools.com/python/pandas/pandas_correlations.asp' },
    { id: 'c-dt-2', title: 'Mastering GroupBy, Aggregations & Slicing', category: 'YouTube • Corey Schafer', duration: '50 phút', url: 'https://www.youtube.com/watch?v=txMdrV1Ut64' },
  ],
  sql1: [
    { id: 'c-sql1-1', title: 'SQL Syntax, SELECT & WHERE Clause', category: 'W3Schools SQL Tutorial', duration: '35 phút', url: 'https://www.w3schools.com/sql/default.asp' },
    { id: 'c-sql1-2', title: 'Khóa học SQL toàn diện cho Data Analyst', category: 'YouTube • freeCodeCamp', duration: '60 phút', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
  ],
  sql2: [
    { id: 'c-sql2-1', title: 'SQL JOINs: INNER, LEFT, RIGHT, FULL', category: 'W3Schools SQL Joins', duration: '55 phút', url: 'https://www.w3schools.com/sql/sql_join.asp' },
    { id: 'c-sql2-2', title: 'Bí kíp làm chủ SQL JOINs & GROUP BY', category: 'YouTube • Alex The Analyst', duration: '45 phút', url: 'https://www.youtube.com/watch?v=lXQzD09BOH0' },
  ],
  eda: [
    { id: 'c-eda-1', title: 'Data Science & Analytics Overview', category: 'W3Schools Data Science', duration: '45 phút', url: 'https://www.w3schools.com/datascience/default.asp' },
    { id: 'c-eda-2', title: 'Data Analysis with Python Full Course', category: 'YouTube • freeCodeCamp', duration: '55 phút', url: 'https://www.youtube.com/watch?v=r-uOLxNrNk8' },
  ],
  stat: [
    { id: 'c-stat-1', title: 'Descriptive Statistics & Mean/Median', category: 'W3Schools Statistics', duration: '50 phút', url: 'https://www.w3schools.com/statistics/index.php' },
    { id: 'c-stat-2', title: 'Statistics - Full University Course on Data Science', category: 'YouTube • freeCodeCamp', duration: '60 phút', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28' },
  ],
  viz: [
    { id: 'c-viz-1', title: 'Matplotlib Intro & Line Plotting', category: 'W3Schools Data Visualization', duration: '45 phút', url: 'https://www.w3schools.com/python/matplotlib_intro.asp' },
    { id: 'c-viz-2', title: 'Vẽ biểu đồ phân tích với Matplotlib', category: 'YouTube • Corey Schafer', duration: '50 phút', url: 'https://www.youtube.com/watch?v=UO98lJQ3QGI' },
  ],
  bm: [
    { id: 'c-bm-1', title: 'Essential Business KPIs (CAC, LTV, Churn)', category: 'Business Analytics Guide', duration: '50 phút', url: 'https://www.investopedia.com/terms/k/kpi.asp' },
    { id: 'c-bm-2', title: 'What are KPIs & Business Metrics?', category: 'YouTube • Alex The Analyst', duration: '45 phút', url: 'https://www.youtube.com/watch?v=ItZlTixh6Bs' },
  ],
  story: [
    { id: 'c-story-1', title: 'Framework: Problem - Evidence - Action', category: 'Strategic Influence Guide', duration: '45 phút', url: 'https://hbr.org/2020/02/how-to-tell-a-story-with-data' },
    { id: 'c-story-2', title: 'Storytelling with Data: 5 Bước kể chuyện', category: 'YouTube • Talks at Google', duration: '45 phút', url: 'https://www.youtube.com/watch?v=8EMW7io4rSI' },
  ],
  proj: [
    { id: 'c-proj-1', title: 'Git Tutorial: Repositories & Commits', category: 'W3Schools Git Tutorial', duration: '45 phút', url: 'https://www.w3schools.com/git/default.asp' },
    { id: 'c-proj-2', title: 'Data Analyst Portfolio Project từ A-Z', category: 'YouTube • Alex The Analyst', duration: '75 phút', url: 'https://www.youtube.com/watch?v=qfyynHBFOsM' },
  ],
  port: [
    { id: 'c-port-1', title: 'Publishing Website on GitHub Pages', category: 'W3Schools GitHub Pages', duration: '40 phút', url: 'https://www.w3schools.com/git/git_remote_pages.asp' },
    { id: 'c-port-2', title: 'Chiến lược làm Portfolio Data ấn tượng', category: 'YouTube • Kaggle', duration: '45 phút', url: 'https://www.youtube.com/watch?v=xrhPjE7wHas' },
  ],
};
export const CHALLENGES = [
  {
    id: 'ch1',
    type: 'Daily',
    title: 'Dữ liệu bán hàng bị nhiễu',
    subtitle: 'Lọc và làm sạch dataset e-commerce',
    description: `Dataset bán hàng online có 1,000 records nhưng bị nhiễu: giá âm, quantity = 0, ngày không hợp lệ.

**Nhiệm vụ:**
1. Xác định và đếm các loại lỗi
2. Làm sạch dữ liệu theo business rules
3. Tính tổng doanh thu sau khi clean
4. Xác định top 3 category theo doanh thu`,
    dataset: `order_id,product,category,quantity,price,date
1,Laptop,Electronics,2,15000000,2024-10-01
2,Phone,Electronics,-1,8000000,2024-10-01  [ERROR: negative qty]
3,Shirt,Fashion,0,350000,2024-10-02  [ERROR: zero qty]
4,TV,Electronics,1,25000000,invalid_date  [ERROR: bad date]
5,Jeans,Fashion,3,450000,2024-10-03
...`,
    requirements: ['Xoá records có quantity <= 0', 'Xoá records có price <= 0', 'Xoá records có date không hợp lệ', 'Tính doanh thu = quantity × price'],
    xpReward: 150,
    timeLimit: '24 giờ',
    participated: false,
    score: null,
  },
  {
    id: 'ch2',
    type: 'Weekly',
    title: 'Phân tích doanh thu Q4/2024',
    subtitle: 'Tìm insight từ dữ liệu bán hàng quý 4',
    description: `Dataset doanh thu 3 tháng Q4/2024 (Oct-Dec) theo ngày, sản phẩm và khu vực.

**Nhiệm vụ:**
1. Tính tổng, trung bình, median doanh thu mỗi tháng
2. Tìm ngày có doanh thu cao nhất và thấp nhất
3. Phân tích MoM growth (% tăng trưởng so với tháng trước)
4. Xác định các outlier và giải thích nguyên nhân có thể
5. Rút ra 3 insight chính từ dữ liệu`,
    dataset: `date,region,product_category,revenue,orders
2024-10-01,Hà Nội,Electronics,45000000,12
2024-10-01,TP.HCM,Fashion,28000000,45
2024-10-01,Đà Nẵng,Electronics,18000000,6
...`,
    requirements: ['Thống kê mô tả đầy đủ', 'Trend analysis', 'Outlier detection', '3 insights cụ thể'],
    xpReward: 500,
    timeLimit: '7 ngày',
    participated: false,
    score: null,
  },
  {
    id: 'ch3',
    type: 'Daily',
    title: 'Tính Median theo nhóm',
    subtitle: 'GroupBy và Window Functions',
    description: `Tính median lương theo từng phòng ban và cấp độ kinh nghiệm.

**Nhiệm vụ:**
1. GroupBy department + experience_level
2. Tính median salary mỗi nhóm  
3. So sánh với company-wide median
4. Tìm nhóm có lương cao hơn 20% so với median chung`,
    dataset: `employee_id,department,experience_level,salary
1,Engineering,Senior,45000000
2,Marketing,Junior,12000000
3,Engineering,Junior,18000000
...`,
    requirements: ['GroupBy 2 cột', 'Tính median', 'So sánh với benchmark', 'Identify high-paying groups'],
    xpReward: 100,
    timeLimit: '24 giờ',
    participated: false,
    score: null,
  },
];

// ── Leaderboard ─────────────────────────────────
export const LEADERBOARD = [
  { rank: 1, name: 'Nguyễn Thanh Long', initials: 'TL', score: 8920, badge: '🥇' },
  { rank: 2, name: 'Trần Minh Phương', initials: 'MP', score: 7650, badge: '🥈' },
  { rank: 3, name: 'Lê Thị Ánh Tuyết', initials: 'AT', score: 6890, badge: '🥉' },
  { rank: 4, name: 'Phạm Đức Anh', initials: 'ĐA', score: 5430, badge: '' },
  { rank: 5, name: 'Hoàng Quỳnh Anh', initials: 'QA', score: 4870, badge: '' },
  { rank: 6, name: 'Nguyễn Minh Khoa', initials: 'MK', score: 3850, badge: '' },
  { rank: 7, name: 'Đặng Thị Loan', initials: 'TL', score: 3210, badge: '' },
  { rank: 8, name: 'Bùi Văn Hải', initials: 'VH', score: 2980, badge: '' },
  { rank: 9, name: 'Vũ Thị Ngân', initials: 'TN', score: 2450, badge: '' },
  { rank: 10, name: 'Đinh Văn Tùng', initials: 'VT', score: 1920, badge: '' },
];

// ── Projects ────────────────────────────────────
export const PROJECTS = [
  {
    id: 'pr1',
    emoji: '🛒',
    title: 'E-Commerce Sales Analysis Dashboard',
    difficulty: 'Beginner',
    duration: '2-3 tuần',
    category: 'Data Analysis',
    dataset: 'Brazilian E-Commerce (Olist) – Kaggle',
    datasetUrl: 'https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce',
    description: 'Phân tích toàn diện dữ liệu bán hàng e-commerce: doanh thu, khách hàng, sản phẩm và đánh giá. Xây dựng dashboard insight-driven cho business team.',
    problem: 'Doanh nghiệp cần hiểu rõ: Sản phẩm nào bán chạy nhất? Khu vực nào có tiềm năng tăng trưởng? Khách hàng nào có giá trị cao nhất (RFM)?',
    objectives: [
      'Phân tích doanh thu theo thời gian (trend, seasonality)',
      'Phân tích địa lý – doanh thu theo bang/thành phố',
      'RFM Analysis để phân khúc khách hàng',
      'Phân tích đánh giá sản phẩm và correlation với doanh thu',
      'Xây dựng dashboard tóm tắt insight chính',
    ],
    deliverables: ['Jupyter Notebook đầy đủ', 'Dashboard (matplotlib/plotly hoặc Tableau)', 'Báo cáo PDF 5-8 trang', 'Slide 10 trang trình bày'],
    criteria: [
      { name: 'Data Cleaning', points: 20 },
      { name: 'Analysis Depth', points: 30 },
      { name: 'Visualization', points: 25 },
      { name: 'Business Insight', points: 25 },
    ],
    tags: ['Pandas', 'Matplotlib', 'Seaborn', 'Business Analysis'],
    status: 'available',
    submitted: false,
  },
  {
    id: 'pr2',
    emoji: '💼',
    title: 'HR Analytics: Dự báo Employee Attrition',
    difficulty: 'Intermediate',
    duration: '3-4 tuần',
    category: 'Predictive Analytics',
    dataset: 'IBM HR Analytics Employee Attrition – Kaggle',
    datasetUrl: 'https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset',
    description: 'Phân tích dữ liệu HR để hiểu nguyên nhân nghỉ việc và xây dựng mô hình dự báo employee attrition giúp HR team can thiệp kịp thời.',
    problem: 'HR team cần dự đoán nhân viên nào có khả năng nghỉ việc cao trong 6 tháng tới để có retention plan phù hợp.',
    objectives: [
      'EDA – khám phá các yếu tố ảnh hưởng đến attrition',
      'Feature Engineering – tạo các biến mới có ý nghĩa',
      'Xây dựng model classification (Logistic Regression / Random Forest)',
      'Đánh giá model và interpret kết quả',
      'Đề xuất retention strategy dựa trên insight',
    ],
    deliverables: ['Jupyter Notebook với pipeline đầy đủ', 'Model với accuracy > 80%', 'Feature importance analysis', 'HR Retention Report'],
    criteria: [
      { name: 'EDA Quality', points: 25 },
      { name: 'Model Performance', points: 30 },
      { name: 'Feature Engineering', points: 20 },
      { name: 'Business Recommendation', points: 25 },
    ],
    tags: ['Pandas', 'Scikit-learn', 'Classification', 'HR Analytics'],
    status: 'available',
    submitted: false,
  },
  {
    id: 'pr3',
    emoji: '🏪',
    title: 'Superstore Sales: Regional Performance Dashboard',
    difficulty: 'Beginner',
    duration: '1-2 tuần',
    category: 'Data Analysis',
    dataset: 'Sample Superstore – Tableau / Kaggle',
    datasetUrl: 'https://www.kaggle.com/datasets/vivek468/superstore-dataset-final',
    description: 'Phân tích dữ liệu bán hàng Superstore để tìm ra regions, categories và sub-categories nào cần cải thiện.',
    problem: 'Manager cần biết: Đâu là vùng hoạt động kém hiệu quả? Category nào có profit margin thấp nhất? Nên discount bao nhiêu để tối ưu profit?',
    objectives: [
      'Phân tích Profit Margin theo Region, Category, Sub-Category',
      'Tìm correlation giữa Discount và Profit',
      'Time series analysis: trend doanh thu theo năm/quý',
      'Xác định segments cần cải thiện',
    ],
    deliverables: ['Jupyter Notebook', 'Minimum 10 charts có insight', 'Executive Summary 1 trang'],
    criteria: [
      { name: 'Data Exploration', points: 30 },
      { name: 'Visualization', points: 35 },
      { name: 'Insight Quality', points: 35 },
    ],
    tags: ['Pandas', 'Seaborn', 'Matplotlib', 'Business Analysis'],
    status: 'available',
    submitted: false,
  },
];

// ── Job Listings ─────────────────────────────────
export const JOBS = [
  {
    id: 'j1',
    company: 'VinCommerce',
    companyEmoji: '🏪',
    companyDesc: 'Chuỗi bán lẻ lớn nhất Việt Nam, 3,000+ cửa hàng',
    title: 'Junior Data Analyst',
    location: 'Hà Nội',
    type: 'Full-time',
    salary: '15 – 25 triệu/tháng',
    experience: '0-2 năm',
    skills: ['Python', 'SQL', 'Power BI', 'Excel'],
    description: 'Phân tích dữ liệu bán hàng, tồn kho và hành vi khách hàng để hỗ trợ ra quyết định cho retail team. Làm việc trực tiếp với Business Analyst senior.',
    requirements: ['Thành thạo Python (Pandas) và SQL', 'Có khả năng làm sạch và xử lý dữ liệu lớn', 'Biết Power BI hoặc Tableau là lợi thế', 'Giao tiếp tốt, có tư duy phân tích'],
    hasChallenge: true,
    challenge: {
      title: 'Phân tích dữ liệu bán hàng VinCommerce',
      desc: 'Tìm insight từ dữ liệu bán hàng 3 tháng',
      deadline: '2024-11-15',
      xpReward: 300,
      problem: 'Sử dụng dataset doanh thu theo cửa hàng và danh mục, xác định các outlier, tính doanh thu trung vị và rút ra insight về xu hướng tiêu dùng.',
      dataset: 'store_id,date,category,revenue,quantity\n1,2024-10-01,Grocery,15000000,234\n1,2024-10-01,Beverage,8000000,156\n2,2024-10-01,Grocery,12000000,189\n...',
      requirements: ['Tìm và xử lý outlier', 'Tính median revenue theo category', 'Top 5 stores theo revenue', '3 data-driven recommendations'],
    },
    applied: false,
    applicationStatus: null,
  },
  {
    id: 'j2',
    company: 'Tiki',
    companyEmoji: '📦',
    companyDesc: 'Sàn thương mại điện tử hàng đầu Việt Nam',
    title: 'Data Analyst – Product Team',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    salary: '20 – 35 triệu/tháng',
    experience: '1-3 năm',
    skills: ['Python', 'SQL', 'A/B Testing', 'Statistics', 'Looker'],
    description: 'Làm việc với Product Manager để đo lường impact của features, chạy A/B tests và xây dựng product metrics framework.',
    requirements: ['Kinh nghiệm A/B testing và statistical analysis', 'Thành thạo SQL và Python', 'Hiểu biết về product metrics (DAU, MAU, Retention)', 'Tiếng Anh đọc hiểu tốt'],
    hasChallenge: true,
    challenge: {
      title: 'Product Metrics Analysis – Tiki',
      desc: 'Phân tích conversion funnel và retention',
      deadline: '2024-11-20',
      xpReward: 400,
      problem: 'Phân tích dữ liệu user behavior trên Tiki: tính conversion rate theo funnel, tìm drop-off point và đề xuất cải thiện.',
      dataset: 'user_id,event,timestamp,product_id\n1001,view,2024-10-01 10:15,P001\n1001,add_to_cart,2024-10-01 10:18,P001\n1002,view,2024-10-01 11:00,P002\n...',
      requirements: ['Tính conversion rate mỗi bước funnel', 'Identify drop-off point chính', 'Cohort retention analysis', 'A/B test recommendation'],
    },
    applied: false,
    applicationStatus: null,
  },
  {
    id: 'j3',
    company: 'MoMo',
    companyEmoji: '💜',
    companyDesc: 'Super app thanh toán số 1 Việt Nam, 31M+ users',
    title: 'Business Intelligence Analyst',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    salary: '25 – 40 triệu/tháng',
    experience: '2-4 năm',
    skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'BigQuery'],
    description: 'Xây dựng và maintain BI dashboards, phân tích business metrics và hỗ trợ C-level trong ra quyết định chiến lược.',
    requirements: ['Thành thạo SQL phức tạp (Window Functions, CTE)', '2+ năm kinh nghiệm BI hoặc Data Analysis', 'Biết Tableau hoặc Power BI', 'Kinh nghiệm làm việc với BigQuery hoặc cloud data warehouse'],
    hasChallenge: false,
    applied: false,
    applicationStatus: null,
  },
  {
    id: 'j4',
    company: 'Shopee',
    companyEmoji: '🛍️',
    companyDesc: 'Nền tảng thương mại điện tử hàng đầu Đông Nam Á',
    title: 'Data Analyst Intern',
    location: 'TP. Hồ Chí Minh',
    type: 'Internship',
    salary: '5 – 10 triệu/tháng',
    experience: 'Sinh viên năm 3-4',
    skills: ['Python', 'SQL', 'Excel', 'Statistics'],
    description: 'Chương trình internship 3-6 tháng, làm việc với team Analytics để học hỏi và thực hành kỹ năng phân tích dữ liệu thực tế.',
    requirements: ['Đang học Data Science, Statistics, IT hoặc ngành liên quan', 'Có kiến thức Python và SQL cơ bản', 'Đam mê dữ liệu và sẵn sàng học hỏi', 'Tư duy logic và chú ý đến chi tiết'],
    hasChallenge: true,
    challenge: {
      title: 'Shopee Intern Data Challenge',
      desc: 'Bài test kỹ năng cho intern',
      deadline: '2024-11-10',
      xpReward: 200,
      problem: 'Cho dataset đơn hàng và sản phẩm của một tuần, thực hiện basic analysis: clean data, tính KPIs và visualize kết quả.',
      dataset: 'order_id,seller_id,buyer_id,product_id,quantity,price,status\n10001,S01,B001,P001,2,150000,completed\n10002,S02,B002,P003,1,450000,cancelled\n...',
      requirements: ['Clean dataset', 'Tính GMV, AOV, cancellation rate', 'Top 10 sellers', 'Insight dạng bullet points'],
    },
    applied: false,
    applicationStatus: null,
  },
];

// ── Resources (Tài nguyên học tập) ──────────────
export const RESOURCES = [
  // Sách chuyên ngành
  {
    id: 'res-book-1',
    title: "Python for Data Analysis (3rd Edition)",
    author: "Wes McKinney (Tác giả Pandas)",
    desc: "Cuốn cẩm nang toàn diện nhất về Pandas, NumPy và IPython trực tiếp từ tác giả sáng lập thư viện.",
    type: 'Sách',
    level: 'Beginner',
    format: 'PDF / Ebook',
    tags: ['Python', 'Pandas', 'NumPy'],
    url: 'https://wesmckinney.com/book/',
    rating: 4.9,
    bookmarks: 1420,
  },
  {
    id: 'res-book-2',
    title: "Storytelling with Data: A Data Visualization Guide",
    author: "Cole Nussbaumer Knaflic",
    desc: "Nghệ thuật trình bày biểu đồ và insight dữ liệu để thuyết phục các bên liên quan và ban giám đốc.",
    type: 'Sách',
    level: 'Intermediate',
    format: 'PDF / Sách giấy',
    tags: ['Data Viz', 'Storytelling', 'Business'],
    url: 'https://www.storytellingwithdata.com/books',
    rating: 4.8,
    bookmarks: 1180,
  },
  {
    id: 'res-book-3',
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    desc: "Kinh thánh về kiến trúc hệ thống phân tán, cơ sở dữ liệu và data pipeline dành cho Data Engineers.",
    type: 'Sách',
    level: 'Advanced',
    format: 'O\'Reilly Book',
    tags: ['Data Engineering', 'Architecture', 'Distributed Systems'],
    url: 'https://dataintensive.net/',
    rating: 5.0,
    bookmarks: 960,
  },
  {
    id: 'res-book-4',
    title: "SQL for Data Analysis: Advanced Techniques",
    author: "Cathy Tanimura",
    desc: "Phương pháp giải quyết các bài toán kinh doanh phức tạp bằng Window Functions, CTE và Cohort Analysis.",
    type: 'Sách',
    level: 'Intermediate',
    format: 'Ebook',
    tags: ['SQL', 'Analytics', 'Business Metrics'],
    url: 'https://www.oreilly.com/library/view/sql-for-data/9781492088776/',
    rating: 4.7,
    bookmarks: 840,
  },

  // Khóa học & Chứng chỉ
  {
    id: 'res-course-1',
    title: "Google Data Analytics Professional Certificate",
    author: "Google Career Certificates",
    desc: "Chương trình đào tạo nền tảng toàn diện 6 tháng từ Google: Excel, SQL, Tableau và R Programming.",
    type: 'Khóa học',
    level: 'Beginner',
    format: 'Coursera (Có trợ cấp tài chính)',
    tags: ['Google', 'Certificate', 'SQL', 'Tableau'],
    url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    rating: 4.8,
    bookmarks: 2350,
  },
  {
    id: 'res-course-2',
    title: "DeepLearning.AI: Machine Learning Specialization",
    author: "Andrew Ng",
    desc: "Khóa học kinh điển giải thích trực quan và ứng dụng thực hành các thuật toán Supervised & Unsupervised Learning.",
    type: 'Khóa học',
    level: 'Intermediate',
    format: 'Online Course',
    tags: ['Machine Learning', 'Andrew Ng', 'AI'],
    url: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    rating: 4.9,
    bookmarks: 3100,
  },
  {
    id: 'res-course-3',
    title: "Kaggle Learn: Data Analysis & Manipulation",
    author: "Kaggle Team",
    desc: "Học tương tác miễn phí với Jupyter Notebook trên nền tảng Kaggle: Pandas, Data Cleaning, SQL.",
    type: 'Khóa học',
    level: 'Beginner',
    format: 'Miễn phí 100%',
    tags: ['Kaggle', 'Free', 'Hands-on'],
    url: 'https://www.kaggle.com/learn',
    rating: 4.8,
    bookmarks: 1890,
  },
  {
    id: 'res-course-4',
    title: "CS50's Introduction to Databases with SQL",
    author: "Harvard University",
    desc: "Khóa học khoa học máy tính hàng đầu về thiết kế cơ sở dữ liệu, quan hệ bảng và tối ưu truy vấn SQL.",
    type: 'Khóa học',
    level: 'Beginner',
    format: 'edX / Free Harvard',
    tags: ['Harvard', 'SQL', 'Database Design'],
    url: 'https://cs50.harvard.edu/sql/',
    rating: 4.9,
    bookmarks: 1620,
  },

  // Cheat Sheets (Tài liệu tra cứu nhanh)
  {
    id: 'res-sheet-1',
    title: "Pandas Data Wrangling & Operations Cheat Sheet",
    author: "Pandas Dev Team",
    desc: "Bản tóm tắt 2 trang toàn bộ các hàm lọc, biến đổi, gom nhóm groupby và xử lý chuỗi trong Pandas.",
    type: 'Cheat Sheet',
    level: 'All',
    format: 'Tải PDF',
    tags: ['Pandas', 'Quick Reference', 'Python'],
    url: 'https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf',
    rating: 4.9,
    bookmarks: 2840,
  },
  {
    id: 'res-sheet-2',
    title: "SQL Window Functions & Advanced Joins Quick Guide",
    author: "DaConnect Community",
    desc: "Sơ đồ trực quan các loại Window Frame (ROWS/RANGE), RANK/DENSE_RANK và cú pháp CTE lồng nhau.",
    type: 'Cheat Sheet',
    level: 'Intermediate',
    format: 'Bản in màu A4',
    tags: ['SQL', 'Window Functions', 'Cheat Sheet'],
    url: '#',
    rating: 4.9,
    bookmarks: 1980,
  },
  {
    id: 'res-sheet-3',
    title: "Git & GitHub Commands for Data Analysts",
    author: "DaConnect Community",
    desc: "Tổng hợp các lệnh git commit, push, branch, stash và giải quyết conflict khi làm việc nhóm dữ liệu.",
    type: 'Cheat Sheet',
    level: 'Beginner',
    format: 'Quick Guide',
    tags: ['Git', 'Version Control', 'CLI'],
    url: '#',
    rating: 4.7,
    bookmarks: 1250,
  },

  // Công cụ & Phần mềm (Tools)
  {
    id: 'res-tool-1',
    title: "DBeaver Community Edition",
    author: "DBeaver Corp",
    desc: "Công cụ quản lý và truy vấn đa cơ sở dữ liệu miễn phí mạnh mẽ nhất: hỗ trợ PostgreSQL, MySQL, SQLite, BigQuery.",
    type: 'Công cụ',
    level: 'All',
    format: 'Phần mềm mã nguồn mở',
    tags: ['Tool', 'SQL Client', 'Database'],
    url: 'https://dbeaver.io/',
    rating: 4.8,
    bookmarks: 2150,
  },
  {
    id: 'res-tool-2',
    title: "Streamlit – Python Web Apps for Data",
    author: "Snowflake / Streamlit",
    desc: "Thư viện Python cho phép biến các script phân tích số liệu thành Web Dashboard tương tác chỉ với 20 dòng code.",
    type: 'Công cụ',
    level: 'Intermediate',
    format: 'Thư viện Python miễn phí',
    tags: ['Streamlit', 'Dashboard', 'Python Web'],
    url: 'https://streamlit.io/',
    rating: 4.9,
    bookmarks: 1780,
  },
  {
    id: 'res-tool-3',
    title: "Google Colaboratory (Colab)",
    author: "Google Research",
    desc: "Môi trường Jupyter Notebook trên đám mây miễn phí, tích hợp sẵn GPU/TPU và liên kết trực tiếp với Google Drive.",
    type: 'Công cụ',
    level: 'All',
    format: 'Cloud Notebook',
    tags: ['Cloud', 'Jupyter', 'Python', 'Free GPU'],
    url: 'https://colab.research.google.com/',
    rating: 4.9,
    bookmarks: 3200,
  },
];

