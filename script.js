document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.querySelector('.main-content');
    const fullNameInput = document.getElementById('fullNameInput');
    const dobInput = document.getElementById('dobInput');
    const phoneNumberInput = document.getElementById('phoneNumberInput');
    const checkButton = document.getElementById('checkButton');
    const findGoodNumberButton = document.getElementById('findGoodNumberButton');
    const resultDiv = document.getElementById('result');
    const loadingOverlay = document.getElementById('loading');
    const spinner = loadingOverlay.querySelector('.spinner');
    const checkmarkWrapper = loadingOverlay.querySelector('.checkmark-wrapper');
    const langToggleButton = document.getElementById('lang-toggle');
    const themeToggleButton = document.getElementById('theme-toggle');
    const carrierModal = document.getElementById('carrierModal');
    const closeButton = carrierModal.querySelector('.close-button');
    const searchGoodNumberButton = document.getElementById('searchGoodNumberButton');

    let currentLang = 'vi'; // Default language
    let currentTheme = 'dark'; // Default theme

    const translations = {
        vi: {
            pageTitle: "🔮 Số Phong Thủy 🔮",
            mainTitle: "🔮 Số Phong Thủy 🔮",
            slogan: "Khám phá bí ẩn đằng sau dãy số của bạn",
            placeholderFullName: "Họ và tên của bạn",
            placeholderPhoneNumber: "Nhập số điện thoại (10 chữ số)",
            buttonPredict: "Tiên Tri Ngay!",
            buttonFindGood: "Số Hợp Mệnh",
            initialMessage: "Nhập thông tin của mày vào ô trên để bắt đầu khám phá vận mệnh!",
            disclaimer: "Lưu ý: Đây chỉ là công cụ giải trí dựa trên các quan niệm phong thủy và dân gian. Không nên quá tin tưởng!",
            langToggle: "ENG",
            chooseCarrier: "Chọn Nhà Mạng",
            buttonSearch: "Dò Số",
            validPhoneLength: "Số điện thoại phải có đúng 10 chữ số.",
            invalidPhonePrefix: "Số điện thoại không hợp lệ (Việt Nam có 10 số, bắt đầu bằng 0).",
            invalidDate: "Ngày sinh không hợp lệ.",
            invalidName: "Họ và tên không được để trống.",
            resultTitle: "KẾT QUẢ TIÊN TRI",
            number: "Số điện thoại:",
            score: "Điểm phong thủy:",
            meaning: "Ý nghĩa tổng quát:",
            carrier: "Nhà mạng:",
            introSuccess: "Giới thiệu thành công",
            processing: "Đang xử lý...",
            findingGoodNumber: "Đang dò tìm số hợp mệnh...",
            goodNumberFound: "Đã tìm thấy số hợp mệnh!",
            noGoodNumber: "Không tìm được số hợp mệnh nào trong giới hạn cho phép.",
            detailPrefix: "Ý nghĩa các số đầu (quẻ dịch):",
            detailSuffix: "Ý nghĩa các số cuối (nút sim, tổng nút):",
            detailOverall: "Đánh giá tổng quan:",
            detailGoodLuck: "Cát Tường (Điểm tốt):",
            detailBadLuck: "Hung Ác (Điểm xấu):",
            detailBalance: "Cân Bằng (Trung hòa):",
            noCarrierSelected: "Vui lòng chọn một nhà mạng trước khi dò số.",
            errorOccurred: "Đã xảy ra lỗi. Vui lòng thử lại.",
            loadingCarrierData: "Đang tải dữ liệu nhà mạng..."
        },
        en: {
            pageTitle: "🔮 Feng Shui Numbers 🔮",
            mainTitle: "🔮 Feng Shui Numbers 🔮",
            slogan: "Discover the mystery behind your numbers",
            placeholderFullName: "Your full name",
            placeholderPhoneNumber: "Enter phone number (10 digits)",
            buttonPredict: "Predict Now!",
            buttonFindGood: "Find Lucky Number",
            initialMessage: "Enter your information above to start exploring your destiny!",
            disclaimer: "Note: This is an entertainment tool based on feng shui and folk beliefs. Do not rely too heavily on it!",
            langToggle: "VIE",
            chooseCarrier: "Choose Carrier",
            buttonSearch: "Search Number",
            validPhoneLength: "Phone number must be exactly 10 digits.",
            invalidPhonePrefix: "Invalid phone number (Vietnamese numbers are 10 digits, starting with 0).",
            invalidDate: "Invalid date of birth.",
            invalidName: "Full name cannot be empty.",
            resultTitle: "PREDICTION RESULT",
            number: "Phone Number:",
            score: "Feng Shui Score:",
            meaning: "Overall Meaning:",
            carrier: "Carrier:",
            introSuccess: "Intro loaded successfully",
            processing: "Processing...",
            findingGoodNumber: "Searching for a lucky number...",
            goodNumberFound: "Lucky number found!",
            noGoodNumber: "No lucky number found within the allowed attempts.",
            detailPrefix: "Meaning of initial digits (Hexagram):",
            detailSuffix: "Meaning of final digits (SIM points, total points):",
            detailOverall: "Overall assessment:",
            detailGoodLuck: "Auspicious (Good points):",
            detailBadLuck: "Inauspicious (Bad points):",
            detailBalance: "Balance (Neutral):",
            noCarrierSelected: "Please select a carrier before searching for a number.",
            errorOccurred: "An error occurred. Please try again.",
            loadingCarrierData: "Loading carrier data..."
        }
    };

    const updateContent = () => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            if (translations[currentLang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLang][key]);
                } else {
                    element.textContent = translations[currentLang][key];
                }
            }
        });
        // Special case for language toggle button text
        langToggleButton.querySelector('.lang-text').textContent = currentLang === 'vi' ? 'ENG' : 'VIE';
    };

    const toggleTheme = () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('light-theme', currentTheme === 'light');
        const icon = themeToggleButton.querySelector('i');
        icon.classList.remove('fa-sun', 'fa-moon');
        icon.classList.add(currentTheme === 'dark' ? 'fa-sun' : 'fa-moon');
    };

    langToggleButton.addEventListener('click', () => {
        currentLang = currentLang === 'vi' ? 'en' : 'vi';
        updateContent();
    });

    themeToggleButton.addEventListener('click', toggleTheme);

    // Initial content update and theme setting
    updateContent();
    document.body.classList.add(currentTheme + '-theme'); // Apply initial theme class

    // Simulate intro loading
    setTimeout(() => {
        introOverlay.classList.add('hidden');
        mainContent.classList.add('show');
    }, 2000); // Intro lasts 2 seconds

    // DO NOT set dobInput.valueAsDate = new Date(); to leave it empty initially

    const getLunarInfo = (dob) => {
        // Simple mock for lunar info, in a real app this would be a complex calculation or API call
        const year = dob.getFullYear();
        if (year < 1900 || year > 2050) return { zodiac: 'N/A', destiny: 'N/A', element: 'N/A' };

        // Corrected zodiacAnimals array order and calculation
        const zodiacAnimals = {
            // Index 0: Thân (Monkey) - 1908, 1920, 1932, ...
            // Index 1: Dậu (Rooster)
            // Index 2: Tuất (Dog)
            // Index 3: Hợi (Pig)
            // Index 4: Tý (Rat) - 1900, 1912, 1924, ...
            // Index 5: Sửu (Ox)
            // Index 6: Dần (Tiger)
            // Index 7: Mão (Rabbit)
            // Index 8: Thìn (Dragon)
            // Index 9: Tỵ (Snake)
            // Index 10: Ngọ (Horse)
            // Index 11: Mùi (Goat)
            vi: ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"],
            en: ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat"]
        };
        
        // Corrected calculation for zodiac: year % 12
        // Example: 1900 (Tý) -> 1900 % 12 = 4 (index of Tý)
        // 1908 (Thân) -> 1908 % 12 = 0 (index of Thân)
        const zodiacIndex = year % 12;

        const canChiTuongSinhTuongKhac = [
            // Can: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý
            // Chi: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi
            // Element: Kim, Mộc, Thủy, Hỏa, Thổ
            // Simplified elemental mapping for destiny based on year cycle (lục thập hoa giáp simplified)
            { year: 1984, element: 'Kim', canChi: 'Giáp Tý' }, { year: 1985, element: 'Kim', canChi: 'Ất Sửu' },
            { year: 1986, element: 'Hỏa', canChi: 'Bính Dần' }, { year: 1987, element: 'Hỏa', canChi: 'Đinh Mão' },
            { year: 1988, element: 'Mộc', canChi: 'Mậu Thìn' }, { year: 1989, element: 'Mộc', canChi: 'Kỷ Tỵ' },
            { year: 1990, element: 'Thổ', canChi: 'Canh Ngọ' }, { year: 1991, element: 'Thổ', canChi: 'Tân Mùi' },
            { year: 1992, element: 'Kim', canChi: 'Nhâm Thân' }, { year: 1993, element: 'Kim', canChi: 'Quý Dậu' },
            { year: 1994, element: 'Hỏa', canChi: 'Giáp Tuất' }, { year: 1995, element: 'Hỏa', canChi: 'Ất Hợi' },
            { year: 1996, element: 'Thủy', canChi: 'Bính Tý' }, { year: 1997, element: 'Thủy', canChi: 'Đinh Sửu' },
            { year: 1998, element: 'Thổ', canChi: 'Mậu Dần' }, { year: 1999, element: 'Thổ', canChi: 'Kỷ Mão' },
            { year: 2000, element: 'Kim', canChi: 'Canh Thìn' }, { year: 2001, element: 'Kim', canChi: 'Tân Tỵ' },
            { year: 2002, element: 'Mộc', canChi: 'Nhâm Ngọ' }, { year: 2003, element: 'Mộc', canChi: 'Quý Mùi' },
            { year: 2004, element: 'Thủy', canChi: 'Giáp Thân' }, { year: 2005, element: 'Thủy', canChi: 'Ất Dậu' },
            { year: 2006, element: 'Hỏa', canChi: 'Bính Tuất' }, { year: 2007, element: 'Hỏa', canChi: 'Đinh Hợi' },
            { year: 2008, element: 'Thổ', canChi: 'Mậu Tý' }, { year: 2009, element: 'Thổ', canChi: 'Kỷ Sửu' },
            { year: 2010, element: 'Mộc', canChi: 'Canh Dần' }, { year: 2011, element: 'Mộc', canChi: 'Tân Mão' },
            { year: 2012, element: 'Thủy', canChi: 'Nhâm Thìn' }, { year: 2013, element: 'Thủy', canChi: 'Quý Tỵ' },
            { year: 2014, element: 'Kim', canChi: 'Giáp Ngọ' }, { year: 2015, element: 'Kim', canChi: 'Ất Mùi' },
            { year: 2016, element: 'Hỏa', canChi: 'Bính Thân' }, { year: 2017, element: 'Hỏa', canChi: 'Đinh Dậu' },
            { year: 2018, element: 'Mộc', canChi: 'Mậu Tuất' }, { year: 2019, element: 'Mộc', canChi: 'Kỷ Hợi' },
            { year: 2020, element: 'Thổ', canChi: 'Canh Tý' }, { year: 2021, element: 'Thổ', canChi: 'Tân Sửu' },
            { year: 2022, element: 'Kim', canChi: 'Nhâm Dần' }, { year: 2023, element: 'Kim', canChi: 'Quý Mão' },
            { year: 2024, element: 'Hỏa', canChi: 'Giáp Thìn' }, { year: 2025, element: 'Hỏa', canChi: 'Ất Tỵ' },
        ];

        const lunarYearData = canChiTuongSinhTuongKhac.find(data => data.year === year);
        const destiny = lunarYearData ? `${lunarYearData.canChi} (${lunarYearData.element})` : 'N/A';
        const element = lunarYearData ? lunarYearData.element : 'N/A';

        return {
            zodiac: zodiacAnimals[currentLang][zodiacIndex], // Đã sửa
            destiny: destiny,
            element: element
        };
    };

    const getCarrier = (phoneNumber) => {
        if (!phoneNumber || phoneNumber.length < 3) return 'Unknown';
        const prefix = phoneNumber.substring(0, 3);
        const prefixes = {
            '086': 'Viettel', '096': 'Viettel', '097': 'Viettel', '098': 'Viettel',
            '032': 'Viettel', '033': 'Viettel', '034': 'Viettel', '035': 'Viettel', '036': 'Viettel',
            '037': 'Viettel', '038': 'Viettel', '039': 'Viettel',

            '089': 'Mobifone', '090': 'Mobifone', '093': 'Mobifone',
            '070': 'Mobifone', '079': 'Mobifone', '077': 'Mobifone', '076': 'Mobifone', '078': 'Mobifone',

            '081': 'Vinaphone', '082': 'Vinaphone', '083': 'Vinaphone', '084': 'Vinaphone', '085': 'Vinaphone',
            '088': 'Vinaphone', '091': 'Vinaphone', '094': 'Vinaphone',

            '092': 'Vietnamobile', '056': 'Vietnamobile', '058': 'Vietnamobile',

            '099': 'Gmobile', '059': 'Gmobile'
        };
        return prefixes[prefix] || 'Unknown';
    };

    const calculateTotalScore = (number) => {
        return number.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    };

    const analyzeNumberMeaning = (number, fullName, dobString) => {
        // Validate inputs before proceeding
        if (!fullName || !dobString || !number || number.length !== 10) {
            throw new Error(currentLang === 'vi' ? "Thông tin đầu vào không hợp lệ để phân tích số." : "Invalid input for number analysis.");
        }

        const dob = new Date(dobString);
        if (isNaN(dob.getTime())) { // Check if date is valid
            throw new Error(currentLang === 'vi' ? "Ngày sinh không hợp lệ." : "Invalid date of birth.");
        }

        const lunarInfo = getLunarInfo(dob);
        const totalScore = calculateTotalScore(number);
        const lastFourDigits = number.substring(number.length - 4);
        const firstThreeDigits = number.substring(0, 3);
        const carrier = getCarrier(number);

        // Simple mock for hexagram and suffix meanings
        const hexagramMeaning = getHexagramMeaning(firstThreeDigits, currentLang);
        const suffixMeaning = getSuffixMeaning(lastFourDigits, currentLang);
        const totalScoreMeaning = getTotalScoreMeaning(totalScore, currentLang);

        const goodPoints = [];
        const badPoints = [];
        const neutralPoints = [];

        // Example scoring logic (simplified for demonstration)
        let overallScore = 0;

        // Base score for total digits
        if (totalScore % 10 === 8 || totalScore % 10 === 9) {
            goodPoints.push(currentLang === 'vi' ? `Tổng nút cao (${totalScore}) mang lại may mắn, tài lộc.` : `High total sum (${totalScore}) brings luck and wealth.`);
            overallScore += 20;
        } else if (totalScore % 10 === 0 || totalScore % 10 === 4 || totalScore % 10 === 7) {
            badPoints.push(currentLang === 'vi' ? `Tổng nút không tốt (${totalScore}) có thể mang lại cản trở.` : `Bad total sum (${totalScore}) may bring obstacles.`);
            overallScore -= 15;
        } else {
            neutralPoints.push(currentLang === 'vi' ? `Tổng nút vừa phải (${totalScore}).` : `Moderate total sum (${totalScore}).`);
        }

        // Score based on final digits (e.g., "thần tài", "lộc phát")
        if (lastFourDigits.endsWith('39') || lastFourDigits.endsWith('79')) { // Thần tài
            goodPoints.push(currentLang === 'vi' ? `Đuôi Thần Tài (${lastFourDigits.slice(-2)}) giúp thu hút tài lộc.` : `"God of Wealth" ending (${lastFourDigits.slice(-2)}) attracts wealth.`);
            overallScore += 25;
        } else if (lastFourDigits.endsWith('68') || lastFourDigits.endsWith('86')) { // Lộc phát
            goodPoints.push(currentLang === 'vi' ? `Đuôi Lộc Phát (${lastFourDigits.slice(-2)}) mang lại sự phát triển.` : `"Prosperity" ending (${lastFourDigits.slice(-2)}) brings growth.`);
            overallScore += 25;
        } else if (lastFourDigits.endsWith('49') || lastFourDigits.endsWith('53')) { // Hung (simplified)
            badPoints.push(currentLang === 'vi' ? `Đuôi số xấu (${lastFourDigits.slice(-2)}) có thể gặp rắc rối.` : `Bad ending digits (${lastFourDigits.slice(-2)}) may cause trouble.`);
            overallScore -= 20;
        }

        // Score based on sequential numbers (gánh đảo, tiến lên)
        const isAscending = (n) => {
            for (let i = 0; i < n.length - 1; i++) {
                if (parseInt(n[i]) >= parseInt(n[i+1])) return false;
            }
            return true;
        };
        const isDescending = (n) => {
            for (let i = 0; i < n.length - 1; i++) {
                if (parseInt(n[i]) <= parseInt(n[i+1])) return false;
            }
            return true;
        };
        const hasRepetitive = (n) => /(.)\1{2,}/.test(n); // Three or more identical digits

        if (isAscending(number.slice(3, 7)) || isDescending(number.slice(3, 7))) { // Example for mid-section
            goodPoints.push(currentLang === 'vi' ? "Dãy số giữa có sự sắp xếp tiến/lùi đẹp." : "Middle digits have good ascending/descending order.");
            overallScore += 10;
        }
        if (hasRepetitive(number)) {
            badPoints.push(currentLang === 'vi' ? "Số có dãy lặp lại quá nhiều, có thể không tốt." : "Number has too many repetitive digits, which may not be good.");
            overallScore -= 10;
        }

        // Compatibility with Birth Element (simplified)
        // Convert overall number "element" (last digit parity/sum) to an element
        const lastDigit = parseInt(number.slice(-1));
        let numberElement = '';
        if ([1, 2].includes(lastDigit)) numberElement = 'Mộc';
        else if ([3, 4].includes(lastDigit)) numberElement = 'Hỏa';
        else if ([5, 6].includes(lastDigit)) numberElement = 'Thổ';
        else if ([7, 8].includes(lastDigit)) numberElement = 'Kim';
        else if ([9, 0].includes(lastDigit)) numberElement = 'Thủy';

        const birthElement = lunarInfo.element;
        const ngũHanhSinhKhac = {
            'Kim': { sinh: 'Thủy', khac: 'Mộc' },
            'Mộc': { sinh: 'Hỏa', khac: 'Thổ' },
            'Thủy': { sinh: 'Mộc', khac: 'Hỏa', hoaGiai: ['Kim', 'Thổ'] }, // Thủy khắc Hỏa, Mộc hóa giải. Kim và Thổ cũng hỗ trợ Thủy.
            'Hỏa': { sinh: 'Thổ', khac: 'Kim' },
            'Thổ': { sinh: 'Kim', khac: 'Thủy' }
        };
        
        // Enhance element interaction logic
        if (birthElement && ngũHanhSinhKhac[birthElement]) {
            if (ngũHanhSinhKhac[birthElement].sinh === numberElement) {
                goodPoints.push(currentLang === 'vi' ? `Mệnh của số (${numberElement}) Tương Sinh với Mệnh của bạn (${birthElement}). Rất tốt!` : `The number's element (${numberElement}) is compatible (produces) with your birth element (${birthElement}). Very good!`);
                overallScore += 30;
            } else if (ngũHanhSinhKhac[birthElement].khac === numberElement) {
                badPoints.push(currentLang === 'vi' ? `Mệnh của số (${numberElement}) Tương Khắc với Mệnh của bạn (${birthElement}). Không tốt.` : `The number's element (${numberElement}) clashes with your birth element (${birthElement}). Not good.`);
                overallScore -= 25;
            } else if (numberElement === birthElement) {
                neutralPoints.push(currentLang === 'vi' ? `Mệnh của số (${numberElement}) và Mệnh của bạn (${birthElement}) là Bình Hòa (cùng mệnh).` : `The number's element (${numberElement}) and your birth element (${birthElement}) are in harmony (same element).`);
                overallScore += 10; // Slightly positive for being the same element
            } else if (ngũHanhSinhKhac[numberElement] && ngũHanhSinhKhac[numberElement].sinh === birthElement) {
                 neutralPoints.push(currentLang === 'vi' ? `Mệnh của số (${numberElement}) được Mệnh của bạn (${birthElement}) Tương Sinh (Bạn sinh số).` : `The number's element (${numberElement}) is produced by your birth element (${birthElement}).`);
                 overallScore += 5; // Good, but less than number generating birth element
            }
            else {
                neutralPoints.push(currentLang === 'vi' ? `Mệnh của số (${numberElement}) và Mệnh của bạn (${birthElement}) là Bình Hòa.` : `The number's element (${numberElement}) and your birth element (${birthElement}) are in balance.`);
                overallScore += 5;
            }
        }


        // Determine overall assessment based on score
        let overallAssessment = '';
        let resultClass = '';
        if (overallScore >= 60) {
            overallAssessment = currentLang === 'vi' ? "Đây là một số điện thoại CỰC KỲ MAY MẮN, mang lại nhiều tài lộc và hanh thông." : "This is an EXTREMELY LUCKY phone number, bringing much wealth and smooth sailing.";
            resultClass = 'good-number';
        } else if (overallScore >= 30) {
            overallAssessment = currentLang === 'vi' ? "Số điện thoại này TỐT, có thể mang lại những điều tích cực." : "This phone number is GOOD, potentially bringing positive things.";
            resultClass = 'good-number';
        } else if (overallScore >= 0) {
            overallAssessment = currentLang === 'vi' ? "Số điện thoại ở mức TRUNG BÌNH, không quá tốt cũng không quá xấu." : "This phone number is AVERAGE, neither particularly good nor bad.";
            resultClass = 'neutral-number';
        } else {
            overallAssessment = currentLang === 'vi' ? "Số điện thoại này KHÔNG TỐT, có thể gặp nhiều khó khăn, trắc trở." : "This phone number is NOT GOOD, potentially leading to many difficulties and obstacles.";
            resultClass = 'bad-number';
        }


        const goodLuckHtml = goodPoints.length > 0 ? `<p><strong>${translations[currentLang].detailGoodLuck}</strong></p><ul>${goodPoints.map(p => `<li>${p}</li>`).join('')}</ul>` : '';
        const badLuckHtml = badPoints.length > 0 ? `<p><strong>${translations[currentLang].detailBadLuck}</strong></p><ul>${badPoints.map(p => `<li>${p}</li>`).join('')}</ul>` : '';
        const balanceHtml = neutralPoints.length > 0 ? `<p><strong>${translations[currentLang].detailBalance}</strong></p><ul>${neutralPoints.map(p => `<li>${p}</li>`).join('')}</ul>` : '';

        return {
            html: `
                <h3 class="${resultClass}">${translations[currentLang].resultTitle}</h3>
                <p><strong>${translations[currentLang].number}</strong> <span class="${resultClass}">${number}</span></p>
                <p><strong>${translations[currentLang].score}</strong> <span class="${resultClass}">${overallScore} / 100</span></p>
                <p><strong>${translations[currentLang].meaning}</strong> <span class="${resultClass}">${overallAssessment}</span></p>
                <p><strong>${translations[currentLang].carrier}</strong> ${carrier}</p>
                <p><strong>${translations[currentLang].placeholderFullName}:</strong> ${fullName}</p>
                <p><strong>${currentLang === 'vi' ? 'Ngày sinh:' : 'Date of Birth:'}</strong> ${dobString}</p>
                <p><strong>${currentLang === 'vi' ? 'Tuổi Âm Lịch:' : 'Lunar Age:'}</strong> ${lunarInfo.zodiac} (${lunarInfo.destiny})</p>
                
                <h4>${translations[currentLang].detailPrefix}</h4>
                <p>${hexagramMeaning}</p>
                
                <h4>${translations[currentLang].detailSuffix}</h4>
                <p>${suffixMeaning}</p>

                <h4>${translations[currentLang].detailOverall}</h4>
                ${goodLuckHtml}
                ${badLuckHtml}
                ${balanceHtml}
            `,
            overallScore: overallScore // Return score for comparison
        };
    };

    function getHexagramMeaning(firstThreeDigits, lang) {
        // Cập nhật mapping dựa trên dữ liệu mày cung cấp
        const mappings = {
            // Viettel
            '032': { vi: "Đầu số mới, mang lại sự khởi đầu thuận lợi.", en: "New prefix, brings a favorable start." },
            '033': { vi: "Biểu tượng cho sự vững chắc và thành công.", en: "Symbolizes firmness and success." },
            '034': { vi: "Kết hợp giữa sự vững chắc (3) và bốn mùa hạnh phúc (4).", en: "Combines stability (3) and four seasons of happiness (4)." },
            '035': { vi: "Sự sinh sôi và phát triển bền vững.", en: "Growth and sustainable development." },
            '036': { vi: "Lộc phát, mang lại tài lộc và may mắn.", en: "Prosperity, brings wealth and luck." },
            '037': { vi: "Thất tài, cần cân nhắc khi sử dụng.", en: "Unlucky wealth, needs consideration." },
            '038': { vi: "Phát tài, tượng trưng cho sự thịnh vượng.", en: "Prosperous wealth, symbolizes prosperity." },
            '039': { vi: "Trường cửu, biểu thị sự bền vững và lâu dài.", en: "Eternity, signifies stability and longevity." },
            '086': { vi: "Phát lộc, mang lại tài lộc và may mắn.", en: "Prosperity, brings wealth and luck." },
            '096': { vi: "Trường cửu, biểu thị sự bền vững và lâu dài.", en: "Eternity, signifies stability and longevity." },
            '097': { vi: "Thất tài, cần cân nhắc khi sử dụng.", en: "Unlucky wealth, needs consideration." },
            '098': { vi: "Phát tài, tượng trưng cho sự thịnh vượng.", en: "Prosperous wealth, symbolizes prosperity." },

            // MobiFone
            '070': { vi: "Khởi đầu thuận lợi, mang lại may mắn.", en: "Favorable start, brings good luck." },
            '076': { vi: "Lộc phát, mang lại tài lộc và may mắn.", en: "Prosperity, brings wealth and luck." },
            '077': { vi: "Thất tài, cần cân nhắc khi sử dụng.", en: "Unlucky wealth, needs consideration." },
            '078': { vi: "Phát tài, tượng trưng cho sự thịnh vượng.", en: "Prosperous wealth, symbolizes prosperity." },
            '079': { vi: "Thần tài lớn, mang lại tài lộc và may mắn.", en: "Major God of Wealth, brings wealth and luck." },
            '089': { vi: "Phát cửu, phát triển vững chắc tới đỉnh vinh quang.", en: "Eternal growth, steady development to peak glory." },
            '090': { vi: "Khởi đầu thuận lợi, mang lại may mắn.", en: "Favorable start, brings good luck." },
            '093': { vi: "Tài lộc, thể hiện chủ sim là người có tài lại có lộc.", en: "Wealth and talent, signifies the owner has both talent and fortune." },

            // VinaPhone
            '081': { vi: "Khởi đầu thuận lợi, mang lại may mắn.", en: "Favorable start, brings good luck." },
            '082': { vi: "Mãi mãi phát, biểu thị sự phát triển bền vững.", en: "Forever prosperous, signifies sustainable development." },
            '083': { vi: "Phát tài, tượng trưng cho sự thịnh vượng.", en: "Prosperous wealth, symbolizes prosperity." },
            '084': { vi: "Phát tài, tượng trưng cho sự thịnh vượng.", en: "Prosperous wealth, symbolizes prosperity." },
            '085': { vi: "Sinh lộc, đại diện cho sự sinh sôi của tài lộc.", en: "Born prosperity, represents the flourishing of wealth." },
            '088': { vi: "Song phát, mang lại tài lộc và may mắn.", en: "Double prosperity, brings wealth and luck." },
            '091': { vi: "Khởi đầu thuận lợi, mang lại may mắn.", en: "Favorable start, brings good luck." },
            '094': { vi: "Tài lộc, thể hiện chủ sim là người có tài lại có lộc.", en: "Wealth and talent, signifies the owner has both talent and fortune." },

            // Vietnamobile
            '056': { vi: "Lộc phát, mang lại tài lộc và may mắn.", en: "Prosperity, brings wealth and luck." },
            '058': { vi: "Phát tài, tượng trưng cho sự thịnh vượng.", en: "Prosperous wealth, symbolizes prosperity." },
            '092': { vi: "Mãi mãi phát, biểu thị sự phát triển bền vững.", en: "Forever prosperous, signifies sustainable development." },

            // Gmobile
            '059': { vi: "Sinh lộc, đại diện cho sự sinh sôi của tài lộc.", en: "Born prosperity, represents the flourishing of wealth." },
            '099': { vi: "Song cửu, biểu thị sự bền vững và lâu dài.", en: "Double eternity, signifies stability and longevity." }
        };
        return mappings[firstThreeDigits] ? mappings[firstThreeDigits][lang] : (lang === 'vi' ? "Ý nghĩa đầu số chưa được cập nhật cho đầu số này." : "Prefix meaning not updated for this prefix.");
    }

    function getSuffixMeaning(lastFourDigits, lang) {
        // More comprehensive (but still not exhaustive) mapping based on last 4 or 2 digits
        const meanings = {
            // Lucky/Auspicious numbers
            '39': { vi: "Thần Tài Nhỏ: Tài lộc, may mắn về tiền bạc. Thu hút vượng khí.", en: "Minor God of Wealth: Wealth, financial luck. Attracts prosperity." },
            '79': { vi: "Thần Tài Lớn: Đại cát, đại lợi về tài chính. Tiền vào như nước.", en: "Major God of Wealth: Great fortune and prosperity in finances. Money flows in." },
            '68': { vi: "Lộc Phát: Mang lại tài lộc và sự phát triển, hanh thông, công việc thăng tiến.", en: "Prosperity & Growth: Brings wealth, development, smooth progress, career advancement." },
            '86': { vi: "Phát Lộc: Biểu tượng cho sự phát đạt, thăng tiến, mở rộng làm ăn.", en: "Growth & Prosperity: Symbolizes success, advancement, business expansion." },
            '83': { vi: "Phát Tài: Phát đạt tài lộc, kinh doanh thuận lợi.", en: "Prosperous Wealth: Business flourishes, easy money." },
            '38': { vi: "Tam Phát: Phát đạt cả 3 phương diện: công danh, tài lộc, sức khỏe.", en: "Triple Growth: Prosperity in three aspects: career, wealth, health." },
            '00': { vi: "Song Không/Tròn Trĩnh: Sự đầy đủ, viên mãn, hoặc khởi đầu từ con số 0 để vươn lên.", en: "Double Zero/Completeness: Fullness, completeness, or starting from zero to rise." },
            '11': { vi: "Nhất Nhất/Song Nhất: Độc nhất vô nhị, luôn dẫn đầu, kiên định.", en: "Double One: Unique, always leading, steadfast." },
            '22': { vi: "Song Hỷ: Hạnh phúc nhân đôi, tình cảm viên mãn, may mắn song hành.", en: "Double Happiness: Double joy, fulfilling relationships, luck accompanies." },
            '33': { vi: "Tam Tài: Thiên - Địa - Nhân, may mắn toàn diện từ trời đất đến con người.", en: "Triple Talent: Heaven-Earth-Human, comprehensive luck from cosmos to people." },
            '55': { vi: "Song Ngũ/Đại Phúc: Phúc lộc dồi dào, cân bằng và ổn định.", en: "Double Five/Great Fortune: Abundant blessings, balance, and stability." },
            '66': { vi: "Lộc Lộc/Song Lộc: Nhân đôi tài lộc, may mắn nối tiếp may mắn.", en: "Double Prosperity: Doubles wealth, luck follows luck." },
            '77': { vi: "Thất Đôi/Đại Thất: May mắn lớn, tài lộc dồi dào, thuận lợi trong mọi việc.", en: "Double Seven/Great Seven: Great luck, abundant wealth, smooth in all endeavors." },
            '88': { vi: "Phát Phát/Song Phát: Phát tài phát lộc gấp bội, công việc và cuộc sống đều phát triển.", en: "Double Growth: Multiplies wealth and prosperity, growth in both work and life." },
            '99': { vi: "Trường Cửu/Vĩnh Cửu: Vĩnh cửu, trường tồn, may mắn mãi mãi, bền vững theo thời gian.", en: "Eternity: Forever, lasting, eternal luck, enduring over time." },
            
            '15': { vi: "Sinh Phúc: Sinh ra may mắn, phúc lộc.", en: "Born Fortune: Gives rise to luck and blessings." },
            '45': { vi: "Bốn Mùa Sinh: Sinh sôi nảy nở quanh năm.", en: "Four Seasons Born: Flourishing year-round." },
            '46': { vi: "Tứ Lộc: Bốn mùa lộc, tài lộc dồi dào.", en: "Four Prosperity: Abundant wealth all year." },
            '56': { vi: "Sinh Lộc: Sinh ra tài lộc.", en: "Born Prosperity: Gives rise to wealth." },
            '59': { vi: "Ngũ Cửu: Phúc đức trường cửu, viên mãn.", en: "Five Nine: Eternal blessings, completeness." },
            '69': { vi: "Lộc Cửu: Lộc mãi mãi, trường cửu.", en: "Prosperity Forever: Wealth forever, eternal." },
            '78': { vi: "Thất Phát: Phát đạt thuận lợi.", en: "Seven Growth: Smooth prosperity." },
            '89': { vi: "Đại Phát Cửu: Phát triển bền vững, lâu dài.", en: "Great Eternal Growth: Sustainable, long-term development." },

            // Patterns like Tam Hoa (XXX), Tứ Quý (XXXX) - Check last 3 or 4 digits
            // Example for Tứ Quý (XXXX) in last 4 digits
            'XXXX': (num, lang) => { // Placeholder, needs actual check
                if (num[0] === num[1] && num[1] === num[2] && num[2] === num[3]) {
                    const digit = num[0];
                    if (['6','8','9'].includes(digit)) {
                        return lang === 'vi' ? `Tứ Quý ${digit}: Rất may mắn, tài lộc dồi dào, quyền lực, địa vị cao.` : `Quadruple ${digit}: Very lucky, abundant wealth, power, high status.`;
                    } else if (['1','2','3','5','7'].includes(digit)) {
                        return lang === 'vi' ? `Tứ Quý ${digit}: Vừa phải, có giá trị riêng, ổn định.` : `Quadruple ${digit}: Moderate, has its own value, stable.`;
                    } else if (['4','0'].includes(digit)) {
                        return lang === 'vi' ? `Tứ Quý ${digit}: Có thể không tốt, cần cân nhắc hoặc xem xét kỹ. (Ví dụ 4444 là Tứ Tử)` : `Quadruple ${digit}: May not be good, needs consideration or careful review. (e.g. 4444 is Four Deaths).`;
                    }
                }
                return null;
            },
            // Example for Tam Hoa (XXX) in last 3 digits
            'XXX': (num, lang) => { // Placeholder, needs actual check
                const lastThree = num.slice(-3);
                if (lastThree[0] === lastThree[1] && lastThree[1] === lastThree[2]) {
                    const digit = lastThree[0];
                    if (['6','8','9'].includes(digit)) {
                        return lang === 'vi' ? `Tam Hoa ${digit}: May mắn, tài lộc tốt, công danh thuận lợi.` : `Triple ${digit}: Lucky, good wealth, smooth career.`;
                    } else if (['1','2','3','5','7'].includes(digit)) {
                        return lang === 'vi' ? `Tam Hoa ${digit}: Bình thường, có ý nghĩa cá nhân, ổn định.` : `Triple ${digit}: Normal, has personal meaning, stable.`;
                    } else if (['4','0'].includes(digit)) {
                        return lang === 'vi' ? `Tam Hoa ${digit}: Có thể không tốt, cần thận trọng. (Ví dụ 444 là Tam Tử)` : `Triple ${digit}: May not be good, needs caution. (e.g. 444 is Triple Death).`;
                    }
                }
                return null;
            },
            // Gánh Đảo (ABBA)
            'ABBA': (num, lang) => {
                const lastFour = num.slice(-4);
                if (lastFour[0] === lastFour[3] && lastFour[1] === lastFour[2] && lastFour[0] !== lastFour[1]) {
                    return lang === 'vi' ? `Gánh Đảo (${lastFour}): Tạo sự cân bằng, ổn định, đôi khi mang ý nghĩa đặc biệt, dễ nhớ.` : `Palindromic (${lastFour}): Creates balance, stability, sometimes carries special meaning, easy to remember.`;
                }
                return null;
            },
            // Số Tiến (ABCD) - last 4 digits form an ascending sequence
            'ABCD_Asc': (num, lang) => {
                const lastFour = num.slice(-4);
                if (parseInt(lastFour[0]) < parseInt(lastFour[1]) &&
                    parseInt(lastFour[1]) < parseInt(lastFour[2]) &&
                    parseInt(lastFour[2]) < parseInt(lastFour[3])) {
                    return lang === 'vi' ? `Số Tiến (${lastFour}): Tượng trưng cho sự thăng tiến, phát triển không ngừng.` : `Ascending Series (${lastFour}): Symbolizes continuous advancement and development.`;
                }
                return null;
            },
            // Số Lùi (DCBA) - last 4 digits form a descending sequence
            'DCBA_Desc': (num, lang) => {
                const lastFour = num.slice(-4);
                if (parseInt(lastFour[0]) > parseInt(lastFour[1]) &&
                    parseInt(lastFour[1]) > parseInt(lastFour[2]) &&
                    parseInt(lastFour[2]) > parseInt(lastFour[3])) {
                    return lang === 'vi' ? `Số Lùi (${lastFour}): Có thể mang ý nghĩa đi xuống, hoặc ngược lại là sự kết thúc để khởi đầu mới.` : `Descending Series (${lastFour}): May signify decline, or conversely, an end to a new beginning.`;
                }
                return null;
            },


            // Bad numbers (simplified common beliefs)
            '49': { vi: "Số xấu: 'Đại hạn', 'Khó khăn', 'Chết chóc'. Thường tránh dùng.", en: "Bad number: 'Great hardship', 'Difficulty', 'Death'. Often avoided." },
            '53': { vi: "Số xấu: 'Khó khăn', 'Tai ương'. Thường tránh dùng.", en: "Bad number: 'Difficulty', 'Misfortune'. Often avoided." },
            '04': { vi: "Tứ Tử: Không may mắn, điềm xấu, có thể liên quan đến mất mát. (tứ đọc trại thành tử)", en: "Four Death: Unlucky, bad omen, possibly related to loss. (tứ sounds like tử - death)." },
            '13': { vi: "Thập Tam: Số không may mắn, có thể gặp trở ngại, rắc rối.", en: "Thirteen: Unlucky number, may encounter obstacles, trouble." },
            '44': { vi: "Song Tử/Tứ Tử: Điềm xấu, rủi ro cao. (tứ đọc trại thành tử)", en: "Double Death/Four Deaths: Bad omen, high risk. (tứ sounds like tử - death)." },
            '74': { vi: "Thất Tử: Mất mát, tiêu hao. (thất đọc trại thành mất, tứ đọc trại thành tử)", en: "Lost Death: Loss, depletion. (thất sounds like lost, tứ sounds like death)." }
        };

        const lastTwoDigits = lastFourDigits.slice(-2);
        const lastThreeDigits = lastFourDigits.slice(-3);
        const lastFullFourDigits = lastFourDigits; // Use full 4 digits for patterns

        // Check specific 2-digit meanings first
        if (meanings[lastTwoDigits]) {
            return meanings[lastTwoDigits][lang];
        }

        // Check for 3-digit patterns (e.g., Tam Hoa)
        if (meanings['XXX'] && meanings['XXX'](lastFullFourDigits, lang)) { // Pass full 4 digits to check last 3
            return meanings['XXX'](lastFullFourDigits, lang);
        }

        // Check for 4-digit patterns (e.g., Tứ Quý, Gánh Đảo, Số Tiến, Số Lùi)
        if (meanings['XXXX'] && meanings['XXXX'](lastFullFourDigits, lang)) {
            return meanings['XXXX'](lastFullFourDigits, lang);
        }
        if (meanings['ABBA'] && meanings['ABBA'](lastFullFourDigits, lang)) {
            return meanings['ABBA'](lastFullFourDigits, lang);
        }
        if (meanings['ABCD_Asc'] && meanings['ABCD_Asc'](lastFullFourDigits, lang)) {
            return meanings['ABCD_Asc'](lastFullFourDigits, lang);
        }
        if (meanings['DCBA_Desc'] && meanings['DCBA_Desc'](lastFullFourDigits, lang)) {
            return meanings['DCBA_Desc'](lastFullFourDigits, lang);
        }
        
        return lang === 'vi' ? "Ý nghĩa đuôi số chưa được cập nhật đầy đủ cho dạng số này." : "Suffix meaning not fully updated for this number pattern.";
    }

    function getTotalScoreMeaning(score, lang) {
        // This function is currently not directly used in the HTML but can be for more detailed score breakdowns
        // Example:
        if (score >= 80) return lang === 'vi' ? "Điểm tổng hòa rất cao, đại cát đại lợi." : "Very high overall score, great fortune.";
        if (score >= 60) return lang === 'vi' ? "Điểm khá cao, mang lại nhiều may mắn." : "Quite high score, brings much luck.";
        if (score >= 40) return lang === 'vi' ? "Điểm trung bình, có thể chấp nhận được." : "Average score, acceptable.";
        return lang === 'vi' ? "Điểm thấp, có thể cần cân nhắc." : "Low score, may need consideration.";
    }

    const showLoading = (messageKey, showSpinner = true) => {
        spinner.style.display = showSpinner ? 'block' : 'none';
        checkmarkWrapper.classList.remove('show');
        // Remove existing message if any
        let messageP = loadingOverlay.querySelector('p');
        if (!messageP) {
            messageP = document.createElement('p');
            loadingOverlay.appendChild(messageP);
        }
        messageP.textContent = translations[currentLang][messageKey];
        messageP.style.color = 'white';
        messageP.style.fontSize = '1.2em';
        
        loadingOverlay.classList.add('show');
    };

    const hideLoading = (showCheckmark = false, messageKey = null) => {
        spinner.style.display = 'none';
        if (showCheckmark) {
            checkmarkWrapper.classList.add('show');
            const messageP = loadingOverlay.querySelector('p');
            if (messageP && messageKey) {
                messageP.textContent = translations[currentLang][messageKey];
            }
        } else {
            loadingOverlay.classList.remove('show');
            checkmarkWrapper.classList.remove('show');
        }
        setTimeout(() => {
            loadingOverlay.classList.remove('show'); // Ensure it hides after checkmark animation
            const messageP = loadingOverlay.querySelector('p');
            if (messageP) {
                messageP.remove(); // Clean up the message element
            }
        }, showCheckmark ? 1000 : 0); // Keep loading screen for a bit to show checkmark
    };

    const displayResult = (analysisResultHtml) => {
        resultDiv.innerHTML = analysisResultHtml;
        resultDiv.scrollTop = 0; // Scroll to top of result
    };

    const validateInputs = (checkPhoneNumber = true) => {
        const fullName = fullNameInput.value.trim();
        const dobString = dobInput.value;
        const phoneNumber = phoneNumberInput.value.trim();

        if (!fullName) {
            alert(translations[currentLang].invalidName);
            return false;
        }
        if (!dobString) {
            alert(translations[currentLang].invalidDate);
            return false;
        }
        if (checkPhoneNumber) {
            if (phoneNumber.length !== 10) {
                alert(translations[currentLang].validPhoneLength);
                return false;
            }
            if (!phoneNumber.startsWith('0')) {
                alert(translations[currentLang].invalidPhonePrefix);
                return false;
            }
        }
        return true;
    };

    checkButton.addEventListener('click', async () => {
        if (!validateInputs(true)) { // Validate phone number too for "Tiên Tri Ngay"
            return;
        }

        const fullName = fullNameInput.value.trim();
        const dobString = dobInput.value;
        const phoneNumber = phoneNumberInput.value.trim();

        showLoading('processing');
        findGoodNumberButton.disabled = true; // Disable until analysis is done
        checkButton.disabled = true;

        try {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            const analysisResult = analyzeNumberMeaning(phoneNumber, fullName, dobString);
            displayResult(analysisResult.html);
            hideLoading(true, 'introSuccess'); // Use introSuccess as a generic "done" message
        } catch (error) {
            console.error("Error analyzing number:", error);
            alert(`${translations[currentLang].errorOccurred} ${error.message || ''}`);
            hideLoading(false);
        } finally {
            findGoodNumberButton.disabled = false;
            checkButton.disabled = false;
        }
    });

    findGoodNumberButton.addEventListener('click', () => {
        // Only validate name and DOB for "Find Good Number" initial click
        if (!validateInputs(false)) { 
            return;
        }

        carrierModal.style.display = 'flex'; // Show the modal
    });

    closeButton.addEventListener('click', () => {
        carrierModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === carrierModal) {
            carrierModal.style.display = 'none';
        }
    });

    searchGoodNumberButton.addEventListener('click', async () => {
        const selectedCarrier = document.querySelector('input[name="carrier"]:checked');
        if (!selectedCarrier) {
            alert(translations[currentLang].noCarrierSelected);
            return;
        }

        const fullName = fullNameInput.value.trim();
        const dobString = dobInput.value;
        const carrierValue = selectedCarrier.value; 

        carrierModal.style.display = 'none'; // Hide modal

        showLoading('findingGoodNumber');
        findGoodNumberButton.disabled = true;
        checkButton.disabled = true;

        try {
            const goodNumberAnalysis = await findBestFengShuiNumber(fullName, dobString, carrierValue);
            if (goodNumberAnalysis) {
                displayResult(goodNumberAnalysis.html);
                hideLoading(true, 'goodNumberFound');
            } else {
                displayResult(`<p class="initial-message">${translations[currentLang].noGoodNumber}</p>`);
                hideLoading(false);
            }
        } catch (error) {
            console.error("Error finding good number:", error);
            alert(`${translations[currentLang].errorOccurred} ${error.message || ''}`);
            hideLoading(false);
        } finally {
            findGoodNumberButton.disabled = false;
            checkButton.disabled = false;
        }
    });

    // Function to generate a random 10-digit phone number with a specific prefix
    function generateRandomPhoneNumber(carrierValue) {
        let prefixBase;
        // Map carrier names to common 2-digit prefixes for random generation
        // Note: This is a simplified approach. Real carrier prefixes are more complex.
        switch (carrierValue) {
            case 'Viettel': prefixBase = ['32', '33', '34', '35', '36', '37', '38', '39', '86', '96', '97', '98'][Math.floor(Math.random() * 12)]; break; // Generates 03x or 086/09x
            case 'Mobifone': prefixBase = ['70', '76', '77', '78', '79', '89', '90', '93'][Math.floor(Math.random() * 8)]; break; // Generates 07x or 089/09x
            case 'Vinaphone': prefixBase = ['81', '82', '83', '84', '85', '88', '91', '94'][Math.floor(Math.random() * 8)]; break; // Generates 08x or 09x
            case 'Vietnamobile': prefixBase = ['56', '58', '92'][Math.floor(Math.random() * 3)]; break; // Generates 05x or 092
            case 'Gmobile': prefixBase = ['59', '99'][Math.floor(Math.random() * 2)]; break; // Generates 059 or 099
            default: prefixBase = ['3','7','8','9','5'][Math.floor(Math.random() * 5)]; // Fallback to a common starting digit if carrier is unknown
        }
        
        let number = '0' + prefixBase;
        // Generate remaining 7 digits
        for (let i = 0; i < 7; i++) {
            number += Math.floor(Math.random() * 10).toString();
        }
        return number;
    }

    async function findBestFengShuiNumber(fullName, dobString, carrierValue, maxAttempts = 1000) {
        const dob = new Date(dobString);
        if (isNaN(dob.getTime())) {
            throw new Error(currentLang === 'vi' ? "Ngày sinh không hợp lệ." : "Invalid date of birth.");
        }

        let bestNumber = null;
        let highestScore = -Infinity;

        for (let i = 0; i < maxAttempts; i++) {
            const potentialNumber = generateRandomPhoneNumber(carrierValue);
            try {
                const analysisResult = analyzeNumberMeaning(potentialNumber, fullName, dobString);
                if (analysisResult.overallScore > highestScore) {
                    highestScore = analysisResult.overallScore;
                    bestNumber = analysisResult;
                }
                // Optional: Stop early if a very good score is found
                if (highestScore >= 80) { // Define what "very good" means
                    return bestNumber;
                }
            } catch (error) {
                // console.warn(`Skipping invalid generated number ${potentialNumber}: ${error.message}`);
                // Continue to next attempt if a generated number is invalid
            }
        }
        return bestNumber; // Return the best one found after all attempts
    }
});
