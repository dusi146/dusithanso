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

        const zodiacAnimals = {
            vi: ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"],
            en: ["Monkey", "Rooster", "Dog", "Pig", "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat"]
        };
        const elements = {
            vi: ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"],
            en: ["Metal", "Wood", "Water", "Fire", "Earth"]
        };

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
            zodiac: zodiacAnimals[currentLang][(year - 4) % 12],
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
        // More comprehensive (but still not exhaustive) mapping based on first 3 digits (mock data)
        // These mappings are simplified and illustrative, not based on full I-Ching calculations
        const mappings = {
            '032': { vi: "Quẻ: Hỏa Địa Tấn (Tiến lên). Ý nghĩa: Có ý nghĩa tiến lên, phát triển mạnh mẽ, được quý nhân phù trợ. Rất tốt cho sự nghiệp và công danh.", en: "Hexagram: Fire on Earth (Progress). Meaning: Signifies strong progress and development, supported by benefactors. Very good for career and reputation." },
            '033': { vi: "Quẻ: Thiên Lôi Vô Vọng (Không có gì sai). Ý nghĩa: Thuận theo tự nhiên, tránh cưỡng cầu. Mọi sự bình an nếu không làm điều trái lẽ.", en: "Hexagram: Heaven over Thunder (Without Error). Meaning: Follow natural course, avoid forcing things. Peace if actions are just." },
            '034': { vi: "Quẻ: Phong Địa Quan (Quan sát). Ý nghĩa: Cần quan sát kỹ lưỡng, thận trọng trước khi hành động. Có cơ hội nhưng phải biết nắm bắt.", en: "Hexagram: Wind over Earth (Contemplation). Meaning: Observe carefully, be cautious before acting. Opportunities exist but must be seized wisely." },
            '035': { vi: "Quẻ: Thủy Địa Tỷ (So sánh, gần gũi). Ý nghĩa: Tinh thần hợp tác, kết nối. Thuận lợi trong quan hệ đối tác, bạn bè.", en: "Hexagram: Water over Earth (Holding Together). Meaning: Cooperative spirit, connections. Favorable for partnerships and friendships." },
            '036': { vi: "Quẻ: Sơn Địa Bác (Tan rã). Ý nghĩa: Giai đoạn suy thoái, cần thận trọng và bảo toàn. Tránh mạo hiểm.", en: "Hexagram: Mountain over Earth (Splitting Apart). Meaning: Period of decline, be cautious and preserve. Avoid risks." },
            '037': { vi: "Quẻ: Địa Trạch Lâm (Lâm gần). Ý nghĩa: Tiến tới gần, có sự thịnh vượng đến. Cần chủ động và kiên trì.", en: "Hexagram: Earth over Lake (Approach). Meaning: Drawing near, prosperity is coming. Be proactive and persistent." },
            '038': { vi: "Quẻ: Lôi Địa Dự (Dự bị, vui vẻ). Ý nghĩa: Hạnh phúc, thuận lợi. Cần chuẩn bị kỹ lưỡng để duy trì thành quả.", en: "Hexagram: Thunder over Earth (Enthusiasm). Meaning: Happiness, favorable. Prepare well to maintain achievements." },
            '039': { vi: "Quẻ: Trạch Địa Tụy (Tụ họp). Ý nghĩa: Tập hợp, tụ họp. Tốt cho các hoạt động cộng đồng, kinh doanh tập thể.", en: "Hexagram: Lake over Earth (Gathering). Meaning: Assembly, coming together. Good for community activities, collective business." },

            '070': { vi: "Quẻ: Địa Thủy Sư (Quân đội). Ý nghĩa: Tổ chức, kỷ luật, có sức mạnh tập thể. Phù hợp cho người lãnh đạo, quản lý.", en: "Hexagram: Earth over Water (Army). Meaning: Organization, discipline, collective strength. Suitable for leaders and managers." },
            '076': { vi: "Quẻ: Hỏa Thủy Vị Tế (Chưa xong). Ý nghĩa: Công việc chưa hoàn thành, cần tiếp tục cố gắng, kiên nhẫn. Cuối cùng sẽ thành công.", en: "Hexagram: Fire over Water (Not Yet Complete). Meaning: Task incomplete, requires continued effort and patience. Will eventually succeed." },
            '077': { vi: "Quẻ: Lôi Hỏa Phong (Phong phú). Ý nghĩa: Thịnh vượng, đầy đủ. Gặp nhiều may mắn và cơ hội lớn.", en: "Hexagram: Thunder over Fire (Abundance). Meaning: Prosperity, completeness. Encounter many opportunities and great luck." },
            '078': { vi: "Quẻ: Sơn Hỏa Bí (Trang trí). Ý nghĩa: Vẻ đẹp bên ngoài, sự tinh tế. Cần chú ý đến nội dung bên trong.", en: "Hexagram: Mountain over Fire (Grace). Meaning: External beauty, refinement. Inner substance also matters." },
            '079': { vi: "Quẻ: Thủy Hỏa Ký Tế (Đã xong). Ý nghĩa: Mọi việc đã hoàn thành, đạt được mục tiêu. Cần giữ gìn thành quả.", en: "Hexagram: Water over Fire (Already Completed). Meaning: All tasks completed, goals achieved. Maintain accomplishments." },

            '086': { vi: "Quẻ: Phong Thiên Tiểu Súc (Tích trữ nhỏ). Ý nghĩa: Tích lũy dần dần, có sự khởi đầu nhỏ nhưng chắc chắn và sẽ phát triển lớn dần.", en: "Hexagram: Wind over Heaven (Minor Accumulation). Meaning: Gradual accumulation, small but steady beginning that will grow." },
            '088': { vi: "Quẻ: Địa Thiên Thái (Thái bình). Ý nghĩa: Thái bình, an lạc, mọi sự hanh thông. Rất tốt cho cuộc sống và công việc.", en: "Hexagram: Earth over Heaven (Peace). Meaning: Peace, tranquility, smooth sailing. Very good for life and work." },
            '089': { vi: "Quẻ: Thiên Phong Cấu (Gặp gỡ). Ý nghĩa: Gặp gỡ, kết nối, có duyên với người khác. Tốt cho quan hệ xã hội, hợp tác kinh doanh.", en: "Hexagram: Heaven over Wind (Encountering). Meaning: Encounters, connections, good karma with others. Good for social relationships and business cooperation." },
            
            '090': { vi: "Quẻ: Địa Lôi Phục (Trở lại). Ý nghĩa: Trở lại, phục hồi, sau khó khăn sẽ có khởi sắc mới. Tốt cho người muốn làm lại từ đầu.", en: "Hexagram: Earth over Thunder (Returning). Meaning: Returning, restoration, new beginnings after difficulties. Good for those wanting to start anew." },
            '091': { vi: "Quẻ: Thủy Thiên Nhu (Chờ đợi). Ý nghĩa: Cần chờ đợi thời cơ, kiên nhẫn sẽ thành công. Không nên nóng vội.", en: "Hexagram: Water over Heaven (Waiting). Meaning: Need to wait for the right time, patience will lead to success. Avoid hastiness." },
            '092': { vi: "Quẻ: Phong Lôi Ích (Tăng thêm). Ý nghĩa: Tăng thêm lợi ích, có sự gia tăng về tài lộc và may mắn. Rất tốt.", en: "Hexagram: Wind over Thunder (Increase). Meaning: Increased benefits, growth in wealth and luck. Very good." },
            '093': { vi: "Quẻ: Trạch Thiên Quải (Quyết đoán). Ý nghĩa: Cần có sự quyết đoán, dứt khoát để vượt qua khó khăn. Tốt cho lãnh đạo.", en: "Hexagram: Lake over Heaven (Resolution). Meaning: Requires decisiveness and determination to overcome difficulties. Good for leaders." },
            '094': { vi: "Quẻ: Thiên Thủy Tụng (Tranh chấp). Ý nghĩa: Có thể gặp tranh chấp, kiện tụng. Cần giải quyết ôn hòa, tránh xung đột.", en: "Hexagram: Heaven over Water (Conflict). Meaning: May encounter disputes, lawsuits. Resolve peacefully, avoid conflict." },
            '096': { vi: "Quẻ: Thiên Phong Cấu (Gặp gỡ). Ý nghĩa: Gặp gỡ, kết nối. Có thể tốt cho quan hệ xã hội, hợp tác.", en: "Hexagram: Heaven over Wind (Encountering). Meaning: Encounters and connections. Good for social relationships and cooperation." },
            '097': { vi: "Quẻ: Phong Hỏa Gia Nhân (Gia đình). Ý nghĩa: Hạnh phúc gia đình, sự hòa thuận. Tốt cho cuộc sống cá nhân và gia đạo.", en: "Hexagram: Wind over Fire (The Family). Meaning: Family happiness, harmony. Good for personal life and household." },
            '098': { vi: "Quẻ: Địa Sơn Khiêm (Khiêm tốn). Ý nghĩa: Khiêm tốn, nhún nhường sẽ được lòng người và đạt thành công bền vững.", en: "Hexagram: Earth over Mountain (Modesty). Meaning: Modesty and humility will win hearts and achieve lasting success." },
            '099': { vi: "Quẻ: Địa Trạch Lâm (Lâm gần). Ý nghĩa: Tiến tới gần, có sự thịnh vượng đến. Cần chủ động và kiên trì.", en: "Hexagram: Earth over Lake (Approach). Meaning: Drawing near, prosperity is coming. Be proactive and persistent." },

            // Add more common prefixes for other carriers if desired
        };
        return mappings[firstThreeDigits] ? mappings[firstThreeDigits][lang] : (lang === 'vi' ? "Ý nghĩa quẻ dịch chưa được cập nhật cho đầu số này." : "Hexagram meaning not updated for this prefix.");
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
            case 'Mobifone': prefixBase = ['70', '79', '77', '76', '78', '89', '90', '93'][Math.floor(Math.random() * 8)]; break; // Generates 07x or 089/09x
            case 'Vinaphone': prefixBase = ['81', '82', '83', '84', '85', '88', '91', '94'][Math.floor(Math.random() * 8)]; break; // Generates 08x or 09x
            case 'Vietnamobile': prefixBase = ['56', '58', '92'][Math.floor(Math.random() * 3)]; break; // Generates 05x or 092
            case 'Gmobile': prefixBase = ['59', '99'][Math.floor(Math.random() * 2)]; break; // Generates 059 or 099
            default: prefixBase = ['3','7','8','9'][Math.floor(Math.random() * 4)] + Math.floor(Math.random() * 10).toString(); // Fallback to a random 0xx prefix
        }

        let num = '0' + prefixBase;
        // Complete to 10 digits
        while (num.length < 10) {
            num += Math.floor(Math.random() * 10).toString();
        }
        return num;
    }

    // Function to find the best feng shui number (now returns full analysis)
    async function findBestFengShuiNumber(fullName, dobString, carrierValue) {
        let bestAnalysisResult = null;
        let highestScore = -Infinity;
        const maxAttempts = 5000; // Increased attempts for better chances to find a good one
        const goodEnoughScore = 60; // Define what "good enough" means

        for (let i = 0; i < maxAttempts; i++) {
            const testNumber = generateRandomPhoneNumber(carrierValue);
            try {
                const analysis = analyzeNumberMeaning(testNumber, fullName, dobString);
                if (analysis.overallScore > highestScore) {
                    highestScore = analysis.overallScore;
                    bestAnalysisResult = analysis;
                }
                // If a "good" enough number is found, stop early
                if (highestScore >= goodEnoughScore) { 
                    break;
                }
            } catch (e) {
                // console.warn(`Skipping invalid number ${testNumber} or analysis error: ${e.message}`);
                // Don't warn too much for generated invalid numbers, just skip
            }
            // Add a small delay to prevent freezing the UI, but keep it fast enough
            if (i % 200 === 0) { // Only yield control every 200 iterations
                await new Promise(resolve => setTimeout(resolve, 5)); 
            }
        }

        return bestAnalysisResult;
    }
});