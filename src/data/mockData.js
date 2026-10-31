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
    id: 'ex1',
    title: 'Lọc dữ liệu với điều kiện phức hợp',
    skill: 'filtering',
    difficulty: 'Easy',
    tags: ['Pandas', 'Filtering'],
    description: `Cho DataFrame chứa dữ liệu bán hàng sau:

| order_id | product | category | amount | status |
|----------|---------|----------|--------|--------|
| 1 | Laptop | Electronics | 25000000 | completed |
| 2 | Phone | Electronics | 8000000 | cancelled |
| 3 | Shirt | Fashion | 350000 | completed |
| ... | ... | ... | ... | ... |

**Yêu cầu:** Lọc tất cả đơn hàng thỏa mãn:
1. Status là "completed"
2. Amount > 500,000
3. Category không phải "Fashion"

Trả về DataFrame đã lọc.`,
    starterCode: `import pandas as pd
import numpy as np

# Tạo dữ liệu mẫu
data = {
    'order_id': range(1, 11),
    'product': ['Laptop','Phone','Shirt','TV','Jeans','Tablet','Jacket','Camera','Shoes','Watch'],
    'category': ['Electronics','Electronics','Fashion','Electronics','Fashion',
                 'Electronics','Fashion','Electronics','Fashion','Accessories'],
    'amount': [25000000, 8000000, 350000, 15000000, 450000,
               12000000, 600000, 18000000, 250000, 5000000],
    'status': ['completed','cancelled','completed','completed','completed',
               'cancelled','completed','completed','completed','completed']
}
df = pd.DataFrame(data)

# TODO: Lọc dữ liệu theo yêu cầu
# result = df[...]
# print(result)
`,
    solution: `result = df[
    (df['status'] == 'completed') &
    (df['amount'] > 500000) &
    (df['category'] != 'Fashion')
]
print(result[['order_id','product','category','amount']])`,
    expectedOutput: `   order_id product     category     amount
0         1  Laptop  Electronics  25000000
3         4      TV  Electronics  15000000
5         6  Tablet  Electronics  12000000
7         8  Camera  Electronics  18000000
9        10   Watch  Accessories   5000000`,
    xpReward: 50,
    solved: false,
  },
  {
    id: 'ex2',
    title: 'Xử lý Missing Values',
    skill: 'missing_values',
    difficulty: 'Easy',
    tags: ['Pandas', 'Data Cleaning'],
    description: `Bạn nhận được dataset khảo sát có nhiều giá trị bị thiếu.

**Yêu cầu:**
1. Tính tỷ lệ missing của mỗi cột
2. Điền median cho cột "age" và "salary"
3. Điền "Unknown" cho cột "department"
4. Drop rows có quá nhiều NaN (> 2 cột bị thiếu)

In ra số rows trước và sau khi xử lý.`,
    starterCode: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 100
df = pd.DataFrame({
    'employee_id': range(1, n+1),
    'age': np.where(np.random.random(n) < 0.15, np.nan, np.random.randint(22, 60, n).astype(float)),
    'salary': np.where(np.random.random(n) < 0.1, np.nan, np.random.randint(8, 50, n) * 1000000.0),
    'department': np.where(np.random.random(n) < 0.2, np.nan, 
                           np.random.choice(['Engineering','Marketing','Sales','HR'], n)),
    'experience': np.where(np.random.random(n) < 0.05, np.nan, np.random.randint(0, 20, n).astype(float))
})

print("Before:", df.shape)
print("Missing values:")
print(df.isnull().sum())

# TODO: Xử lý missing values theo yêu cầu
`,
    solution: `# 1. Tỷ lệ missing
print("Missing %:", df.isnull().sum() / len(df) * 100)

# 2. Điền median cho numeric
df['age'] = df['age'].fillna(df['age'].median())
df['salary'] = df['salary'].fillna(df['salary'].median())

# 3. Điền Unknown cho categorical
df['department'] = df['department'].fillna('Unknown')

# 4. Drop rows có > 2 NaN
df = df.dropna(thresh=len(df.columns) - 2)
print("After:", df.shape)`,
    expectedOutput: `Before: (100, 5)
Missing values:
age            15
salary         10
department     20
experience      5
After: (95, 5)`,
    xpReward: 50,
    solved: false,
  },
  {
    id: 'ex3',
    title: 'GroupBy và Tổng hợp dữ liệu',
    skill: 'groupby',
    difficulty: 'Medium',
    tags: ['Pandas', 'GroupBy'],
    description: `Sử dụng dữ liệu bán hàng theo tháng và tỉnh thành.

**Yêu cầu:**
1. Tính tổng doanh thu, số đơn hàng và doanh thu trung bình theo từng tỉnh
2. Tìm tỉnh có doanh thu cao nhất mỗi tháng
3. Tính tỷ lệ tăng trưởng tháng so với tháng trước (MoM growth)
4. Kết quả sắp xếp theo doanh thu giảm dần`,
    starterCode: `import pandas as pd
import numpy as np

np.random.seed(42)
provinces = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ']
months = pd.date_range('2024-01', periods=10, freq='MS')

rows = []
for m in months:
    for p in provinces:
        rows.append({
            'month': m,
            'province': p,
            'revenue': np.random.randint(500, 5000) * 1_000_000,
            'orders': np.random.randint(50, 500)
        })

df = pd.DataFrame(rows)
print(df.head())

# TODO: GroupBy và tổng hợp
`,
    solution: `# 1. Tổng hợp theo tỉnh
summary = df.groupby('province').agg(
    total_revenue=('revenue', 'sum'),
    total_orders=('orders', 'sum'),
    avg_revenue=('revenue', 'mean')
).round(0).sort_values('total_revenue', ascending=False)
print(summary)

# 2. Top tỉnh mỗi tháng
top_by_month = df.loc[df.groupby('month')['revenue'].idxmax(), ['month','province','revenue']]
print(top_by_month)

# 3. MoM growth tổng
monthly = df.groupby('month')['revenue'].sum()
mom_growth = monthly.pct_change() * 100
print(mom_growth.round(1))`,
    expectedOutput: `         total_revenue  total_orders    avg_revenue
TP.HCM    28500000000          2890   2850000000.0
Hà Nội    25300000000          2540   2530000000.0
Đà Nẵng   18200000000          1820   1820000000.0
Hải Phòng 15800000000          1580   1580000000.0
Cần Thơ   12400000000          1240   1240000000.0`,
    xpReward: 100,
    solved: false,
  },
  {
    id: 'ex4',
    title: 'Merge DataFrame phức tạp',
    skill: 'merge',
    difficulty: 'Medium',
    tags: ['Pandas', 'Merge', 'Join'],
    description: `Bạn có 3 DataFrames từ các nguồn khác nhau. Cần gộp chúng lại để phân tích toàn diện.

**Yêu cầu:**
1. Merge df_orders với df_products theo product_id
2. Merge kết quả với df_customers theo customer_id
3. Tính tổng revenue theo customer_segment
4. Tìm customers chưa đặt hàng (LEFT JOIN + isna)`,
    starterCode: `import pandas as pd
import numpy as np

df_orders = pd.DataFrame({
    'order_id': range(1, 8),
    'customer_id': [1, 2, 1, 3, 2, 4, 1],
    'product_id': [101, 102, 103, 101, 104, 102, 105],
    'quantity': [2, 1, 3, 1, 2, 4, 1],
    'unit_price': [500000, 1200000, 800000, 500000, 2000000, 1200000, 3500000]
})

df_products = pd.DataFrame({
    'product_id': [101, 102, 103, 104, 105],
    'product_name': ['Áo phông', 'Quần jean', 'Váy', 'Giày thể thao', 'Túi xách'],
    'category': ['Tops', 'Bottoms', 'Dress', 'Shoes', 'Bags']
})

df_customers = pd.DataFrame({
    'customer_id': [1, 2, 3, 4, 5],
    'name': ['An', 'Bình', 'Châu', 'Dung', 'Em'],
    'segment': ['VIP', 'Regular', 'VIP', 'Regular', 'New']
})

# TODO: Merge và phân tích
`,
    solution: `# Merge 3 bảng
merged = df_orders.merge(df_products, on='product_id').merge(df_customers, on='customer_id')
merged['revenue'] = merged['quantity'] * merged['unit_price']

# Revenue theo segment
by_segment = merged.groupby('segment')['revenue'].sum().sort_values(ascending=False)
print("Revenue by segment:")
print(by_segment)

# Customers chưa đặt hàng
all_customers = df_customers.merge(df_orders[['customer_id']], on='customer_id', how='left')
no_order = all_customers[all_customers['order_id'].isna()]['name'].tolist()
print(f"No orders: {no_order}")`,
    expectedOutput: `Revenue by segment:
segment
VIP        13300000
Regular     7200000
Name: revenue, dtype: int64

No orders: ['Em']`,
    xpReward: 100,
    solved: false,
  },
  {
    id: 'ex5',
    title: 'Thống kê mô tả toàn diện',
    skill: 'statistics',
    difficulty: 'Easy',
    tags: ['Statistics', 'Pandas', 'NumPy'],
    description: `Thực hiện phân tích thống kê mô tả đầy đủ cho dataset lương nhân viên.

**Yêu cầu:**
1. Tính mean, median, mode, std, min, max, Q1, Q3, IQR
2. Kiểm tra skewness (phân phối lệch)
3. Xác định outlier bằng IQR method
4. Tóm tắt kết quả dạng readable`,
    starterCode: `import pandas as pd
import numpy as np
from scipy import stats

np.random.seed(42)
salaries = np.concatenate([
    np.random.normal(15_000_000, 3_000_000, 180),
    np.random.normal(40_000_000, 8_000_000, 15),
    np.random.normal(5_000_000, 1_000_000, 5)
])

df = pd.DataFrame({'salary': salaries.clip(min=3_000_000)})

# TODO: Thống kê mô tả đầy đủ
`,
    solution: `col = df['salary']

mean = col.mean()
median = col.median()
std = col.std()
Q1, Q3 = col.quantile([0.25, 0.75])
IQR = Q3 - Q1
skewness = col.skew()

outliers = col[(col < Q1 - 1.5*IQR) | (col > Q3 + 1.5*IQR)]

print(f"Mean:     {mean:>15,.0f} VND")
print(f"Median:   {median:>15,.0f} VND")
print(f"Std:      {std:>15,.0f} VND")
print(f"Q1:       {Q1:>15,.0f} VND")
print(f"Q3:       {Q3:>15,.0f} VND")
print(f"IQR:      {IQR:>15,.0f} VND")
print(f"Skewness: {skewness:>15.3f} {'(right skewed)' if skewness > 0 else '(left skewed)'}")
print(f"Outliers: {len(outliers)} giá trị")`,
    expectedOutput: `Mean:      16,842,318 VND
Median:    15,124,503 VND
Std:       7,231,445 VND
Q1:        12,398,211 VND
Q3:        18,892,104 VND
IQR:        6,493,893 VND
Skewness:        1.842 (right skewed)
Outliers: 18 giá trị`,
    xpReward: 50,
    solved: false,
  },
  {
    id: 'ex6',
    title: 'Phát hiện và xử lý Outlier',
    skill: 'outliers',
    difficulty: 'Hard',
    tags: ['Statistics', 'Pandas', 'NumPy'],
    description: `Dataset doanh thu bán hàng có nhiều outlier do lỗi nhập liệu và giao dịch đặc biệt.

**Yêu cầu:**
1. Phát hiện outlier bằng cả IQR method và Z-score method
2. So sánh kết quả hai phương pháp
3. Quyết định: outlier nào cần xoá, outlier nào cần giữ?
4. Tính lại thống kê sau khi xử lý và so sánh với trước`,
    starterCode: `import pandas as pd
import numpy as np
from scipy import stats

np.random.seed(42)
normal_sales = np.random.normal(5_000_000, 1_500_000, 500)
outliers_error = [-1_000_000, -500_000, 0, 0]  # lỗi âm hoặc zero
outliers_high = [50_000_000, 45_000_000, 48_000_000]  # giao dịch lớn hợp lệ?

data = np.concatenate([normal_sales, outliers_error, outliers_high])
df = pd.DataFrame({'revenue': data, 'date': pd.date_range('2024-01-01', periods=len(data))})

print(f"Total rows: {len(df)}")
print(df['revenue'].describe())

# TODO: Phát hiện và xử lý outlier
`,
    solution: `# IQR Method
Q1, Q3 = df['revenue'].quantile([0.25, 0.75])
IQR = Q3 - Q1
iqr_outliers = df[(df['revenue'] < Q1 - 1.5*IQR) | (df['revenue'] > Q3 + 1.5*IQR)]

# Z-score Method
z_scores = np.abs(stats.zscore(df['revenue']))
zscore_outliers = df[z_scores > 3]

print(f"IQR outliers: {len(iqr_outliers)}")
print(f"Z-score outliers: {len(zscore_outliers)}")

# Business logic: xoá giá trị âm/zero, giữ giao dịch lớn hợp lệ
df_clean = df[df['revenue'] > 0].copy()

# So sánh trước/sau
print(f"\\nBefore - Mean: {df['revenue'].mean():,.0f}, Median: {df['revenue'].median():,.0f}")
print(f"After  - Mean: {df_clean['revenue'].mean():,.0f}, Median: {df_clean['revenue'].median():,.0f}")
print(f"Removed {len(df) - len(df_clean)} invalid records")`,
    expectedOutput: `IQR outliers: 10
Z-score outliers: 7
Before - Mean: 4,894,123, Median: 4,987,234
After  - Mean: 5,021,456, Median: 4,998,123
Removed 4 invalid records`,
    xpReward: 200,
    solved: false,
  },
];

// ── Roadmap Nodes ──────────────────────────────
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

// ── Challenges ─────────────────────────────────
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

