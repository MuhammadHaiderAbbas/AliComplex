// ===== Urdu translation layer =====
// The pages are written in English. When Urdu is chosen, every piece of text on the page is
// swapped for its Urdu version (including text that loads later), and the layout turns right-to-left.
// Doctor names, qualifications and bios typed in the staff panel stay as typed.

const UR = {
  // header / footer / navigation
  'Skip to content': 'مواد پر جائیں', 'Home': 'ہوم', 'About': 'ہمارے بارے میں', 'Doctors': 'ڈاکٹرز', 'Services': 'سروسز',
  'FAQs': 'سوالات', 'Contact': 'رابطہ', 'My Booking': 'میری بکنگ', 'Book Appointment': 'اپائنٹمنٹ بک کریں',
  'Ali Medical Complex': 'علی میڈیکل کمپلیکس', 'Suraj Miani Road, Multan': 'سورج میانی روڈ، ملتان',
  'Chungi No. 1, Suraj Miani Road, Multan': 'چونگی نمبر 1، سورج میانی روڈ، ملتان',
  'Chungi No. 1, Suraj Miani Road, Multan, Punjab': 'چونگی نمبر 1، سورج میانی روڈ، ملتان، پنجاب',
  'Open menu': 'مینو کھولیں', 'Main': 'مین مینو', 'Chat on WhatsApp': 'واٹس ایپ پر بات کریں',
  'Specialist care in endocrinology, child health, internal medicine and psychology for families in Multan.': 'ملتان کے خاندانوں کے لیے ہارمونز، بچوں کی صحت، میڈیسن اور نفسیات کا ماہرانہ علاج۔',
  'WhatsApp': 'واٹس ایپ', 'Hospital': 'ہسپتال', 'About Us': 'ہمارے بارے میں', 'Patients': 'مریضوں کے لیے', 'Our Doctors': 'ہمارے ڈاکٹرز',
  'Check / Cancel Booking': 'بکنگ دیکھیں / منسوخ کریں', 'Leave a Review': 'رائے دیں', 'Get Directions': 'راستہ دیکھیں', 'Staff Login': 'اسٹاف لاگ اِن',
  'Facebook': 'فیس بک',

  // home
  'Trusted specialist care for you and your family': 'آپ اور آپ کے خاندان کے لیے قابلِ اعتماد ماہر علاج',
  'Consult experienced doctors in diabetes & hormones, child health, internal medicine and mental health. Book your visit online in under a minute.': 'شوگر و ہارمونز، بچوں کی صحت، میڈیسن اور ذہنی صحت کے تجربہ کار ڈاکٹروں سے مشورہ کریں۔ ایک منٹ سے کم میں آن لائن وقت بک کریں۔',
  'Book an Appointment': 'اپائنٹمنٹ بک کریں', 'Visit Us': 'ہم سے ملیں', 'Address': 'پتہ', 'Phone': 'فون', 'OPD Days': 'او پی ڈی کے دن',
  'Monday – Saturday (timings vary by doctor)': 'پیر تا ہفتہ (اوقات ہر ڈاکٹر کے مختلف ہیں)', 'Consultation Fee': 'مشاورتی فیس',
  'Pick a doctor & time': 'ڈاکٹر اور وقت چنیں', 'Find a Doctor': 'ڈاکٹر تلاش کریں', 'Search by specialty': 'شعبے کے لحاظ سے تلاش',
  'Check Booking': 'بکنگ چیک کریں', 'Status, cancel or review': 'اسٹیٹس، منسوخی یا رائے', 'WhatsApp Us': 'واٹس ایپ کریں', 'Quick questions': 'فوری سوالات',
  'Our Specialties': 'ہمارے شعبے', 'Specialist consultations under one roof.': 'ایک ہی چھت تلے ماہر ڈاکٹرز۔',
  'Endocrinology': 'ہارمونز و شوگر (اینڈوکرائنالوجی)', 'Pediatrics': 'بچوں کا علاج (پیڈیاٹرکس)', 'Internal Medicine': 'میڈیسن', 'Psychology': 'نفسیات',
  'Diabetes, thyroid, hormonal disorders, PCOS, obesity and weight management.': 'شوگر، تھائیرائیڈ، ہارمونز کے مسائل، پی سی او ایس، موٹاپا اور وزن کا کنٹرول۔',
  'Newborn care, vaccination, child nutrition, growth and childhood illnesses.': 'نومولود کی دیکھ بھال، حفاظتی ٹیکے، بچوں کی غذا، نشوونما اور بچپن کی بیماریاں۔',
  'Blood pressure, diabetes, infections, stomach and liver problems in adults.': 'بڑوں میں بلڈ پریشر، شوگر، انفیکشن، معدے اور جگر کے مسائل۔',
  'Anxiety, depression, OCD, stress, family counselling and child behaviour.': 'گھبراہٹ، ڈپریشن، او سی ڈی، ذہنی دباؤ، خاندانی کونسلنگ اور بچوں کا رویہ۔',
  'View all services': 'تمام سروسز دیکھیں',
  'Qualified, experienced specialists. Choose a doctor to see available times.': 'مستند اور تجربہ کار ماہرین۔ دستیاب اوقات دیکھنے کے لیے ڈاکٹر منتخب کریں۔',
  'See all doctors': 'تمام ڈاکٹرز دیکھیں', 'Why patients choose us': 'مریض ہمیں کیوں چنتے ہیں',
  'Qualified specialists, including an Assistant Professor of Medicine': 'مستند ماہرین، بشمول میڈیسن کے اسسٹنٹ پروفیسر',
  'Book online any time and get an instant reference number': 'کسی بھی وقت آن لائن بکنگ اور فوری ریفرنس نمبر',
  'Scheduled time slots for shorter waiting': 'مقررہ وقت، کم انتظار',
  'Clear fees shown upfront, paid at the clinic': 'فیس پہلے سے واضح، ادائیگی کلینک پر',
  'Cancel online, or reach us on WhatsApp for help': 'آن لائن منسوخی، یا مدد کے لیے واٹس ایپ',
  'About the hospital': 'ہسپتال کے بارے میں', 'Specialties': 'شعبے', 'Days a week': 'دن ہفتے میں', 'Online booking': 'آن لائن بکنگ',
  'What our patients say': 'ہمارے مریض کیا کہتے ہیں', 'Reviews from patients after their visit.': 'معائنے کے بعد مریضوں کی آراء۔',
  'Need to see a specialist?': 'کسی ماہر ڈاکٹر سے ملنا ہے؟', 'Book online now and skip the queue.': 'ابھی آن لائن بک کریں اور قطار سے بچیں۔',

  // doctor cards / profile
  'Experience:': 'تجربہ:', 'Fee:': 'فیس:', 'Consultation fee:': 'مشاورتی فیس:', 'Available today': 'آج دستیاب', 'View Profile': 'پروفائل دیکھیں',
  'Book': 'بک کریں', 'Call to Book': 'بکنگ کے لیے کال کریں', 'Call to confirm timings': 'اوقات کی تصدیق کے لیے کال کریں',
  '← All doctors': '→ تمام ڈاکٹرز', 'Qualifications': 'تعلیمی قابلیت', 'Patient reviews': 'مریضوں کی آراء', 'Clinic timings': 'کلینک کے اوقات',
  'Ali Medical Complex, Suraj Miani Road': 'علی میڈیکل کمپلیکس، سورج میانی روڈ', 'Off': 'چھٹی', 'Share profile': 'پروفائل شیئر کریں',
  'No reviews yet. Patients can leave a review after their visit from the': 'ابھی کوئی رائے نہیں۔ مریض معائنے کے بعد', 'page.': 'صفحے سے رائے دے سکتے ہیں۔',
  'Doctor not found': 'ڈاکٹر نہیں ملا', 'Link copied.': 'لنک کاپی ہو گیا۔',
  'Child specialist. Please call the hospital to confirm timings and book.': 'بچوں کے ماہر۔ اوقات اور بکنگ کے لیے براہِ کرم ہسپتال کال کریں۔',
  'Assistant Professor': 'اسسٹنٹ پروفیسر', 'Head of Department': 'سربراہِ شعبہ', 'Professor': 'پروفیسر', 'Associate Professor': 'ایسوسی ایٹ پروفیسر',
  'Endocrinologist': 'ہارمونز و شوگر کے ماہر', 'Pediatrician': 'بچوں کے ماہر', 'Psychologist': 'ماہرِ نفسیات',
  'Internal Medicine Specialist': 'میڈیسن اسپیشلسٹ', 'General Physician': 'جنرل فزیشن', 'Gynecologist': 'گائناکالوجسٹ',

  // about
  'About Ali Medical Complex': 'علی میڈیکل کمپلیکس کے بارے میں', 'Specialist care close to home, on Suraj Miani Road, Multan.': 'گھر کے قریب ماہرانہ علاج، سورج میانی روڈ، ملتان۔',
  'Who we are': 'ہم کون ہیں',
  'Ali Medical Complex is a healthcare facility at Chungi No. 1, Suraj Miani Road, Multan. We bring together qualified specialists in endocrinology, child health, internal medicine and psychology so that families can get expert outpatient care in one place.': 'علی میڈیکل کمپلیکس چونگی نمبر 1، سورج میانی روڈ، ملتان پر واقع ایک طبی مرکز ہے۔ ہم ہارمونز، بچوں کی صحت، میڈیسن اور نفسیات کے مستند ماہرین کو ایک جگہ اکٹھا کرتے ہیں تاکہ خاندانوں کو ایک ہی جگہ ماہرانہ علاج مل سکے۔',
  'Our doctors trained at leading institutions, including Nishtar Hospital Multan, Quaid-e-Azam Medical College and the College of Physicians & Surgeons Pakistan. Several hold postgraduate qualifications such as FCPS, MD and MS.': 'ہمارے ڈاکٹروں نے نشتر ہسپتال ملتان، قائدِ اعظم میڈیکل کالج اور کالج آف فزیشنز اینڈ سرجنز پاکستان جیسے بڑے اداروں سے تربیت حاصل کی ہے۔ کئی ڈاکٹرز ایف سی پی ایس، ایم ڈی اور ایم ایس جیسی اعلیٰ ڈگریاں رکھتے ہیں۔',
  'We focus on careful diagnosis, clear explanations and respectful treatment, and we use online booking so patients spend less time waiting.': 'ہماری توجہ درست تشخیص، واضح وضاحت اور باعزت علاج پر ہے، اور آن لائن بکنگ کی بدولت مریضوں کو کم انتظار کرنا پڑتا ہے۔',
  'At a glance': 'ایک نظر میں', 'Location': 'مقام', 'Endocrinology, Pediatrics, Internal Medicine, Psychology': 'ہارمونز و شوگر، بچوں کا علاج، میڈیسن، نفسیات',
  'OPD': 'او پی ڈی', 'Our values': 'ہماری اقدار', 'Respect': 'احترام', 'Every patient is treated with dignity, privacy and patience.': 'ہر مریض سے عزت، رازداری اور تحمل سے پیش آتے ہیں۔',
  'Accuracy': 'درستگی', 'Careful history, examination and the right tests before treatment.': 'علاج سے پہلے مکمل ہسٹری، معائنہ اور درست ٹیسٹ۔',
  'Clarity': 'وضاحت', 'We explain your condition and treatment in simple words.': 'ہم آپ کی بیماری اور علاج آسان الفاظ میں سمجھاتے ہیں۔',
  'Your time': 'آپ کا وقت', 'Scheduled slots and online booking to reduce waiting.': 'مقررہ وقت اور آن لائن بکنگ سے کم انتظار۔',
  'Facilities & services': 'سہولیات اور سروسز', 'Specialist OPD': 'اسپیشلسٹ او پی ڈی', 'Consultations with specialists in four departments, six days a week.': 'چار شعبوں کے ماہرین سے مشورہ، ہفتے میں چھ دن۔',
  'Online appointments': 'آن لائن اپائنٹمنٹ', 'Book, check and cancel appointments online at any time.': 'کسی بھی وقت آن لائن بکنگ، چیک اور منسوخی۔',
  'Child health': 'بچوں کی صحت', 'Newborn checks, vaccination advice and care for childhood illnesses.': 'نومولود کا معائنہ، حفاظتی ٹیکوں کا مشورہ اور بچپن کی بیماریوں کا علاج۔',
  'Diabetes & hormone care': 'شوگر اور ہارمونز کا علاج', 'Diagnosis and long-term management of diabetes and thyroid problems.': 'شوگر اور تھائیرائیڈ کی تشخیص اور طویل مدتی علاج۔',
  'Counselling & therapy': 'کونسلنگ اور تھراپی', 'Psychological assessment, therapy and family counselling.': 'نفسیاتی جائزہ، تھراپی اور خاندانی کونسلنگ۔',
  'Patient support': 'مریضوں کی مدد', 'Help by phone and WhatsApp before and after your visit.': 'معائنے سے پہلے اور بعد میں فون اور واٹس ایپ پر رہنمائی۔',
  'Meet our doctors': 'ہمارے ڈاکٹرز سے ملیں', 'See qualifications, timings, fees and patient reviews.': 'قابلیت، اوقات، فیس اور مریضوں کی آراء دیکھیں۔', 'View Doctors': 'ڈاکٹرز دیکھیں',

  // doctors list
  'Search by name or specialty, then book online.': 'نام یا شعبے سے تلاش کریں، پھر آن لائن بک کریں۔', 'All': 'سب',
  'Search doctor or condition…': 'ڈاکٹر یا بیماری تلاش کریں…', 'Search doctors': 'ڈاکٹرز تلاش کریں', 'No doctors match your search.': 'آپ کی تلاش سے کوئی ڈاکٹر نہیں ملا۔',
  'Loading doctors…': 'ڈاکٹرز لوڈ ہو رہے ہیں…', 'Loading…': 'لوڈ ہو رہا ہے…',

  // services
  'Services & Specialties': 'سروسز اور شعبے', 'What we treat, and which doctor to see.': 'ہم کن بیماریوں کا علاج کرتے ہیں، اور کس ڈاکٹر سے ملیں۔',
  'Common conditions treated': 'عام بیماریاں جن کا علاج ہوتا ہے', 'Doctors:': 'ڈاکٹرز:', 'Please call to ask about availability.': 'دستیابی کے لیے براہِ کرم کال کریں۔',
  'Type 1 & Type 2 diabetes': 'ٹائپ 1 اور ٹائپ 2 شوگر', 'Thyroid disorders (hypo/hyperthyroidism, goitre)': 'تھائیرائیڈ کے مسائل (کمی/زیادتی، گلہڑ)',
  'PCOS and hormonal imbalance': 'پی سی او ایس اور ہارمونز کا عدم توازن', 'Obesity and weight management': 'موٹاپا اور وزن کا کنٹرول', 'High cholesterol': 'کولیسٹرول کی زیادتی',
  'Growth and pituitary disorders': 'قد کی نشوونما اور پچوٹری غدود کے مسائل', 'Osteoporosis and calcium problems': 'ہڈیوں کی کمزوری اور کیلشیم کے مسائل',
  'Newborn check-ups': 'نومولود کا معائنہ', 'Vaccination schedule': 'حفاظتی ٹیکوں کا شیڈول', 'Fever, cough, diarrhoea and infections': 'بخار، کھانسی، دست اور انفیکشن',
  'Growth and development concerns': 'نشوونما سے متعلق مسائل', 'Child nutrition and feeding advice': 'بچوں کی غذا اور خوراک کا مشورہ', 'Asthma and allergies in children': 'بچوں میں دمہ اور الرجی',
  'Colic and newborn problems': 'پیٹ کا درد (کولک) اور نومولود کے مسائل', 'High blood pressure': 'ہائی بلڈ پریشر', 'Diabetes follow-up': 'شوگر کا فالو اپ',
  'Fever and infections (typhoid, dengue)': 'بخار اور انفیکشن (ٹائیفائیڈ، ڈینگی)', 'Stomach, acidity and liver problems': 'معدہ، تیزابیت اور جگر کے مسائل',
  'Hepatitis B & C': 'ہیپاٹائٹس بی اور سی', 'General health check-ups': 'عمومی طبی معائنہ', 'Anxiety and panic attacks': 'گھبراہٹ اور پینک اٹیک',
  'Depression and low mood': 'ڈپریشن اور اداسی', 'OCD': 'او سی ڈی (وہم کی بیماری)', 'Stress and anger management': 'ذہنی دباؤ اور غصے پر قابو',
  'Family and marriage counselling': 'خاندانی اور ازدواجی کونسلنگ', 'Child behaviour and learning problems': 'بچوں کے رویے اور پڑھائی کے مسائل',
  'Psychological assessment and IQ testing': 'نفسیاتی جائزہ اور آئی کیو ٹیسٹ', 'Not sure which doctor to see?': 'معلوم نہیں کس ڈاکٹر سے ملیں؟',
  'Send us a WhatsApp message or call, and our staff will guide you to the right specialist.': 'ہمیں واٹس ایپ کریں یا کال کریں، ہمارا اسٹاف آپ کو صحیح ماہر تک رہنمائی کرے گا۔',
  'Ask on WhatsApp': 'واٹس ایپ پر پوچھیں',

  // faq
  'Frequently Asked Questions': 'اکثر پوچھے جانے والے سوالات', 'Quick answers about booking, fees and your visit.': 'بکنگ، فیس اور معائنے کے بارے میں فوری جوابات۔',
  'Appointments': 'اپائنٹمنٹ', 'How do I book an appointment?': 'میں اپائنٹمنٹ کیسے بک کروں؟',
  'Click “Book Appointment”, choose a doctor, pick a date and time, and enter the patient’s details. You get a booking reference straight away. You can also call us or send a WhatsApp message.': '“اپائنٹمنٹ بک کریں” پر کلک کریں، ڈاکٹر، تاریخ اور وقت چنیں، اور مریض کی تفصیل درج کریں۔ آپ کو فوراً بکنگ ریفرنس مل جائے گا۔ آپ ہمیں کال یا واٹس ایپ بھی کر سکتے ہیں۔',
  'Is my appointment confirmed immediately?': 'کیا میری اپائنٹمنٹ فوراً کنفرم ہو جاتی ہے؟',
  'Your time slot is reserved as soon as you book. Our staff may call you on the number you gave to confirm. You can check the status any time on the “My Booking” page.': 'بک کرتے ہی آپ کا وقت محفوظ ہو جاتا ہے۔ تصدیق کے لیے ہمارا اسٹاف آپ کے دیے گئے نمبر پر کال کر سکتا ہے۔ آپ “میری بکنگ” صفحے پر کسی بھی وقت اسٹیٹس دیکھ سکتے ہیں۔',
  'How far ahead can I book?': 'کتنے دن پہلے بک کر سکتا ہوں؟', 'You can book up to 60 days ahead, on the days and times each doctor is available.': 'آپ 60 دن پہلے تک، ڈاکٹر کے دستیاب دنوں اور اوقات میں بک کر سکتے ہیں۔',
  'Can I cancel or change my appointment?': 'کیا میں اپائنٹمنٹ منسوخ یا تبدیل کر سکتا ہوں؟',
  'Yes. Go to “My Booking”, enter your reference and phone number, and cancel. Then book a new time, or call us for help.': 'جی ہاں۔ “میری بکنگ” پر جائیں، ریفرنس اور فون نمبر درج کر کے منسوخ کریں۔ پھر نیا وقت بک کریں، یا مدد کے لیے کال کریں۔',
  'I lost my booking reference. What should I do?': 'میرا بکنگ ریفرنس گم ہو گیا، کیا کروں؟',
  'Call or WhatsApp us with the patient’s name and phone number and our staff will find your booking.': 'مریض کا نام اور فون نمبر بتا کر ہمیں کال یا واٹس ایپ کریں، ہمارا اسٹاف آپ کی بکنگ ڈھونڈ دے گا۔',
  'Can I book for my child or a family member?': 'کیا میں اپنے بچے یا گھر والے کے لیے بک کر سکتا ہوں؟',
  'Yes. Enter the patient’s name and age, and your own phone number so we can contact you.': 'جی ہاں۔ مریض کا نام اور عمر لکھیں، اور اپنا فون نمبر دیں تاکہ ہم آپ سے رابطہ کر سکیں۔',
  'Fees & payment': 'فیس اور ادائیگی', 'How much is the consultation fee?': 'مشاورتی فیس کتنی ہے؟',
  'Each doctor’s fee is shown on their profile and when you book. Fees currently range from Rs. 1,000 to Rs. 2,500.': 'ہر ڈاکٹر کی فیس ان کی پروفائل اور بکنگ کے وقت دکھائی جاتی ہے۔ فیس اس وقت 1,000 سے 2,500 روپے تک ہے۔',
  'How do I pay?': 'ادائیگی کیسے کروں؟', 'The fee is paid at the hospital reception at the time of your visit.': 'فیس معائنے کے وقت ہسپتال کے ریسپشن پر ادا کی جاتی ہے۔',
  'Are there extra charges for booking online?': 'کیا آن لائن بکنگ کے اضافی پیسے ہیں؟', 'No. Booking online is free.': 'نہیں۔ آن لائن بکنگ مفت ہے۔',
  'Your visit': 'آپ کا معائنہ', 'What should I bring?': 'ساتھ کیا لاؤں؟',
  'Please bring your CNIC (or the child’s B-form), previous prescriptions and test reports, and a list of medicines you take.': 'براہِ کرم شناختی کارڈ (یا بچے کا ب فارم)، پرانے نسخے اور ٹیسٹ رپورٹس، اور استعمال ہونے والی دواؤں کی فہرست ساتھ لائیں۔',
  'When should I arrive?': 'کب پہنچوں؟', 'Please arrive about 10 minutes before your appointment time.': 'براہِ کرم اپنے وقت سے تقریباً 10 منٹ پہلے پہنچیں۔',
  'Where is the hospital?': 'ہسپتال کہاں ہے؟',
  'Chungi No. 1, Suraj Miani Road, Multan. Use the “Get Directions” link on the Contact page to open Google Maps.': 'چونگی نمبر 1، سورج میانی روڈ، ملتان۔ گوگل میپس کھولنے کے لیے رابطہ صفحے پر “راستہ دیکھیں” استعمال کریں۔',
  'Reviews & feedback': 'آراء اور تجاویز', 'How can I leave a review?': 'میں رائے کیسے دوں؟',
  'After your visit is marked complete, open “My Booking”, enter your reference and phone number, and rate your doctor. Reviews are checked by our staff before they appear on the website.': 'معائنہ مکمل ہونے کے بعد “میری بکنگ” کھولیں، ریفرنس اور فون نمبر درج کریں اور ڈاکٹر کو ریٹنگ دیں۔ ویب سائٹ پر دکھانے سے پہلے ہمارا اسٹاف آراء کا جائزہ لیتا ہے۔',
  'How do I make a complaint or suggestion?': 'شکایت یا تجویز کیسے دوں؟', 'Please use the form on the Contact page. Our staff read every message.': 'براہِ کرم رابطہ صفحے پر فارم استعمال کریں۔ ہمارا اسٹاف ہر پیغام پڑھتا ہے۔',
  'No matching questions.': 'کوئی ملتا جلتا سوال نہیں ملا۔', 'Ask us directly': 'ہم سے براہِ راست پوچھیں', 'Still have a question?': 'ابھی بھی کوئی سوال ہے؟',
  'Call us, message us on WhatsApp, or use the contact form.': 'ہمیں کال کریں، واٹس ایپ کریں، یا رابطہ فارم استعمال کریں۔', 'Contact Us': 'رابطہ کریں',
  'Search questions…': 'سوال تلاش کریں…', 'Search questions': 'سوالات تلاش کریں',

  // contact
  'Call, WhatsApp, visit, or send us a message.': 'کال کریں، واٹس ایپ کریں، تشریف لائیں، یا پیغام بھیجیں۔', 'Call': 'کال کریں',
  'For appointments and enquiries.': 'اپائنٹمنٹ اور معلومات کے لیے۔', 'Quick questions, directions and help with bookings.': 'فوری سوالات، راستہ اور بکنگ میں مدد۔',
  'Visit': 'تشریف لائیں', 'Send us a message': 'ہمیں پیغام بھیجیں', 'Your name *': 'آپ کا نام *', 'Mobile number *': 'موبائل نمبر *',
  'Email (optional)': 'ای میل (اختیاری)', 'Subject': 'موضوع', 'General enquiry': 'عمومی معلومات', 'Appointment help': 'اپائنٹمنٹ میں مدد',
  'Doctor availability': 'ڈاکٹر کی دستیابی', 'Feedback / suggestion': 'رائے / تجویز', 'Complaint': 'شکایت', 'Message *': 'پیغام *',
  'For medical emergencies, please go to the nearest emergency department or call 1122.': 'ایمرجنسی کی صورت میں قریبی ایمرجنسی وارڈ جائیں یا 1122 پر کال کریں۔',
  'Send Message': 'پیغام بھیجیں', 'Sending…': 'بھیجا جا رہا ہے…',
  'Map location is approximate. Use “Get Directions” for turn-by-turn navigation.': 'نقشے پر مقام تقریبی ہے۔ مکمل راستے کے لیے “راستہ دیکھیں” استعمال کریں۔',
  'Map showing Ali Medical Complex': 'علی میڈیکل کمپلیکس کا نقشہ',
  'Thank you! Your message has been sent. Our staff will contact you soon.': 'شکریہ! آپ کا پیغام بھیج دیا گیا ہے۔ ہمارا اسٹاف جلد آپ سے رابطہ کرے گا۔',

  // booking
  'Book an Appointment ': 'اپائنٹمنٹ بک کریں', 'Choose a doctor, pick a time, and you’re done.': 'ڈاکٹر چنیں، وقت منتخب کریں، بس۔',
  '1. Doctor': '1۔ ڈاکٹر', '2. Date & Time': '2۔ تاریخ اور وقت', '3. Patient Details': '3۔ مریض کی تفصیل', 'Select a doctor': 'ڈاکٹر منتخب کریں',
  'Select date': 'تاریخ منتخب کریں', 'Available times': 'دستیاب اوقات', 'Pick a date to see times.': 'اوقات دیکھنے کے لیے تاریخ چنیں۔',
  'Back': 'واپس', 'Continue': 'آگے بڑھیں', 'Patient full name *': 'مریض کا پورا نام *', 'Age': 'عمر', 'Gender': 'جنس', 'Select': 'منتخب کریں',
  'Male': 'مرد', 'Female': 'عورت', 'Other': 'دیگر', 'Reason for visit (optional)': 'آنے کی وجہ (اختیاری)',
  'e.g. follow-up for diabetes, child has fever for 3 days': 'مثلاً شوگر کا فالو اپ، بچے کو 3 دن سے بخار ہے',
  'The consultation fee is paid at the hospital reception.': 'مشاورتی فیس ہسپتال کے ریسپشن پر ادا کی جاتی ہے۔', 'Confirm Booking': 'بکنگ کنفرم کریں', 'Booking…': 'بک ہو رہا ہے…',
  'Appointment Booked': 'اپائنٹمنٹ بک ہو گئی', 'Please save your booking reference:': 'براہِ کرم اپنا بکنگ ریفرنس محفوظ کر لیں:',
  'Please arrive 10 minutes early and bring previous reports. Our staff may call you to confirm.': 'براہِ کرم 10 منٹ پہلے پہنچیں اور پرانی رپورٹس ساتھ لائیں۔ تصدیق کے لیے ہمارا اسٹاف کال کر سکتا ہے۔',
  'Questions? Call': 'سوال ہے؟ کال کریں', 'Add to calendar': 'کیلنڈر میں شامل کریں', 'Send to WhatsApp': 'واٹس ایپ پر بھیجیں', 'Print': 'پرنٹ کریں',
  'Back to Home': 'ہوم پر واپس', 'Doctor': 'ڈاکٹر', 'Specialty': 'شعبہ', 'Fee (pay at clinic)': 'فیس (کلینک پر ادائیگی)', 'Place': 'جگہ',
  'Date & time': 'تاریخ اور وقت', 'Patient': 'مریض',
  'All slots are booked on this date. Please choose another day.': 'اس تاریخ کے تمام اوقات بک ہیں۔ براہِ کرم کوئی اور دن چنیں۔',

  // my booking
  'Check your appointment, cancel it, or review your visit.': 'اپنی اپائنٹمنٹ دیکھیں، منسوخ کریں، یا معائنے پر رائے دیں۔', 'Booking reference': 'بکنگ ریفرنس',
  'Mobile number used for booking': 'بکنگ میں دیا گیا موبائل نمبر', 'Find Booking': 'بکنگ تلاش کریں', 'Lost your reference? Call': 'ریفرنس گم ہو گیا؟ کال کریں',
  'or': 'یا', 'WhatsApp us': 'واٹس ایپ کریں', 'Rate your visit': 'اپنے معائنے کو ریٹ کریں',
  'Your first name, rating and comment may be shown on the doctor’s profile after our staff review it.': 'اسٹاف کے جائزے کے بعد آپ کا پہلا نام، ریٹنگ اور تبصرہ ڈاکٹر کی پروفائل پر دکھایا جا سکتا ہے۔',
  'Your experience (optional)': 'آپ کا تجربہ (اختیاری)', 'Submit Review': 'رائے جمع کریں', 'Rating': 'ریٹنگ', 'Excellent': 'بہترین', 'Good': 'اچھا',
  'Average': 'درمیانہ', 'Poor': 'کمزور', 'Very poor': 'بہت کمزور', 'How was the doctor, staff and waiting time?': 'ڈاکٹر، اسٹاف اور انتظار کا وقت کیسا رہا؟',
  'Cancel Appointment': 'اپائنٹمنٹ منسوخ کریں', 'Book again': 'دوبارہ بک کریں', 'Your slot is reserved. Staff may call you to confirm.': 'آپ کا وقت محفوظ ہے۔ تصدیق کے لیے اسٹاف کال کر سکتا ہے۔',
  '✓ You have reviewed this visit. Thank you!': '✓ آپ اس معائنے پر رائے دے چکے ہیں۔ شکریہ!', 'Cancel this appointment?': 'کیا یہ اپائنٹمنٹ منسوخ کر دی جائے؟',
  'Your appointment has been cancelled.': 'آپ کی اپائنٹمنٹ منسوخ کر دی گئی ہے۔',
  'Thank you! Your review has been submitted and will appear after staff approval.': 'شکریہ! آپ کی رائے جمع ہو گئی ہے اور اسٹاف کی منظوری کے بعد دکھائی جائے گی۔',
  'Please choose a star rating.': 'براہِ کرم اسٹار ریٹنگ منتخب کریں۔',
  'pending': 'زیرِ التوا', 'confirmed': 'کنفرم', 'completed': 'مکمل', 'cancelled': 'منسوخ', 'no-show': 'نہیں آئے',

  // 404
  'Page not found': 'صفحہ نہیں ملا', 'The page you are looking for doesn’t exist or has moved.': 'آپ جو صفحہ ڈھونڈ رہے ہیں وہ موجود نہیں یا منتقل ہو گیا ہے۔', 'Go to Home': 'ہوم پر جائیں',

  // messages from the server
  'Please enter the patient name.': 'براہِ کرم مریض کا نام درج کریں۔',
  'Please enter a valid Pakistani phone number, e.g. 03001234567.': 'براہِ کرم درست پاکستانی فون نمبر درج کریں، مثلاً 03001234567۔',
  'Please enter a valid mobile number, e.g. 03001234567.': 'براہِ کرم درست موبائل نمبر درج کریں، مثلاً 03001234567۔',
  'Please enter a valid age.': 'براہِ کرم درست عمر درج کریں۔', 'Please choose a doctor.': 'براہِ کرم ڈاکٹر منتخب کریں۔',
  'That time is not available. Please pick another slot.': 'یہ وقت دستیاب نہیں۔ براہِ کرم کوئی اور وقت چنیں۔',
  'Sorry, that slot was just booked. Please pick another.': 'معذرت، یہ وقت ابھی بک ہو گیا۔ براہِ کرم کوئی اور وقت چنیں۔',
  'This phone number already has 3 upcoming bookings. Please call the hospital for more.': 'اس فون نمبر پر پہلے ہی 3 بکنگز ہیں۔ مزید کے لیے براہِ کرم ہسپتال کال کریں۔',
  'No booking found with that reference and phone number.': 'اس ریفرنس اور فون نمبر سے کوئی بکنگ نہیں ملی۔',
  'This booking cannot be cancelled.': 'یہ بکنگ منسوخ نہیں ہو سکتی۔',
  'You can leave a review after your visit is completed.': 'معائنہ مکمل ہونے کے بعد آپ رائے دے سکتے ہیں۔',
  'Please choose a rating from 1 to 5 stars.': 'براہِ کرم 1 سے 5 اسٹار تک ریٹنگ دیں۔',
  'You have already reviewed this visit. Thank you!': 'آپ اس معائنے پر پہلے ہی رائے دے چکے ہیں۔ شکریہ!',
  'Please enter your name.': 'براہِ کرم اپنا نام درج کریں۔', 'Please enter a valid email address.': 'براہِ کرم درست ای میل درج کریں۔',
  'Please write your message.': 'براہِ کرم اپنا پیغام لکھیں۔',
  'You have already sent several messages today. We will get back to you soon.': 'آپ آج کئی پیغامات بھیج چکے ہیں۔ ہم جلد آپ سے رابطہ کریں گے۔',
  'Network problem. Please check your internet and try again.': 'نیٹ ورک کا مسئلہ۔ براہِ کرم انٹرنیٹ چیک کر کے دوبارہ کوشش کریں۔',
  'Something went wrong. Please try again.': 'کچھ غلط ہو گیا۔ براہِ کرم دوبارہ کوشش کریں۔', 'Doctor not found ': 'ڈاکٹر نہیں ملا',

  // org chart, services, verification (v4)
  "Our Team": "ہماری ٹیم",
  "Specialists in eye care, ENT, heart, women’s health, skin, child health and dental care, with physiotherapy, nutrition, laboratory and pharmacy under one roof.": "آنکھ، کان ناک گلا، دل، خواتین کی صحت، جلد، بچوں اور دانتوں کے ماہرین، اور فزیوتھراپی، غذائیت، لیبارٹری و فارمیسی ایک ہی چھت تلے۔",
  "Please call to ask": "معلومات کے لیے کال کریں",
  "Specialist care, therapy, tests and medicines under one roof.": "ماہرانہ علاج، تھراپی، ٹیسٹ اور دوائیں ایک ہی جگہ۔",
  "Eye Care": "آنکھوں کا علاج",
  "Eye check-ups, vision problems, eye infections, cataract and glaucoma assessment.": "آنکھوں کا معائنہ، نظر کی کمزوری، انفیکشن، موتیا اور کالا موتیا کی جانچ۔",
  "ENT (Ear, Nose & Throat)": "کان، ناک اور گلا (ای این ٹی)",
  "Ear, nose, throat and sinus problems in adults and children.": "بڑوں اور بچوں میں کان، ناک، گلے اور سائنس کے مسائل۔",
  "Cardiology": "امراضِ قلب",
  "Heart health, chest pain, blood pressure and cholesterol.": "دل کی صحت، سینے کا درد، بلڈ پریشر اور کولیسٹرول۔",
  "Gynecology & Obstetrics": "زنانہ امراض و زچگی",
  "Pregnancy care and women’s health at every age.": "حمل کی دیکھ بھال اور ہر عمر میں خواتین کی صحت۔",
  "Dermatology": "جلدی امراض",
  "Skin, hair and nail problems.": "جلد، بالوں اور ناخنوں کے مسائل۔",
  "Dental Care": "دانتوں کا علاج",
  "Check-ups, fillings, extractions and gum care.": "معائنہ، فلنگ، دانت نکالنا اور مسوڑھوں کا علاج۔",
  "Physiotherapy": "فزیوتھراپی",
  "Rehabilitation for pain, injuries, stroke and after surgery.": "درد، چوٹ، فالج اور آپریشن کے بعد بحالی۔",
  "Nutrition & Diet": "غذائیت اور ڈائٹ",
  "Diet plans for weight, diabetes, pregnancy and children.": "وزن، شوگر، حمل اور بچوں کے لیے ڈائٹ پلان۔",
  "Anxiety, depression, stress, family counselling and child behaviour.": "گھبراہٹ، ڈپریشن، ذہنی دباؤ، خاندانی کونسلنگ اور بچوں کا رویہ۔",
  "Laboratory": "لیبارٹری",
  "Blood and urine tests under a qualified pathologist.": "مستند پیتھالوجسٹ کی نگرانی میں خون اور پیشاب کے ٹیسٹ۔",
  "Pharmacy": "فارمیسی",
  "In-house pharmacy run by a qualified pharmacist (Pharm-D).": "مستند فارماسسٹ (فارم ڈی) کے زیرِ انتظام ہسپتال کی اپنی فارمیسی۔",
  "Ophthalmologist": "ماہرِ امراضِ چشم",
  "ENT Specialist": "ای این ٹی اسپیشلسٹ",
  "Cardiologist": "ماہرِ امراضِ قلب",
  "Dermatologist": "ماہرِ امراضِ جلد",
  "Dentist": "ڈینٹسٹ",
  "Physiotherapist": "فزیوتھراپسٹ",
  "Nutritionist": "ماہرِ غذائیت",
  "Occupational Therapist": "آکیوپیشنل تھراپسٹ",
  "Pathologist": "پیتھالوجسٹ",
  "Pharmacist": "فارماسسٹ",
  "Head of Clinical Services": "سربراہ کلینیکل سروسز",
  "Director": "ڈائریکٹر",
  "Primary Health Organisation Manager": "پرائمری ہیلتھ آرگنائزیشن مینیجر",
  "Head Nurse": "ہیڈ نرس",
  "Nurse": "نرس",
  "Male Nurse": "میل نرس",
  "Admin Officer": "ایڈمن آفیسر",
  "Finance Manager": "فنانس مینیجر",
  "Accountant": "اکاؤنٹنٹ",
  "Receptionist Incharge": "انچارج ریسیپشن",
  "Day Receptionist": "ریسیپشنسٹ (دن)",
  "Night Receptionist": "ریسیپشنسٹ (رات)",
  "Record Keeper": "ریکارڈ کیپر",
  "Cleaning & Maintenance Supervisor": "سپروائزر صفائی و مرمت",
  "Day Sweeper": "خاکروب (دن)",
  "Night Sweeper": "خاکروب (رات)",
  "Female Sweeper": "خاتون خاکروب",
  "Allied Health Team": "الائیڈ ہیلتھ ٹیم",
  "Management": "انتظامیہ",
  "Clinical Services": "کلینیکل سروسز",
  "Allied Health": "الائیڈ ہیلتھ",
  "Nursing": "نرسنگ",
  "Administration & Finance": "انتظامیہ و مالیات",
  "Support Services": "معاون سروسز",
  "Specialists in 10 fields, led by our Head of Clinical Services": "10 شعبوں کے ماہرین، سربراہ کلینیکل سروسز کی قیادت میں",
  "Physiotherapy, nutrition, laboratory and pharmacy on site": "فزیوتھراپی، غذائیت، لیبارٹری اور فارمیسی ہسپتال میں موجود",
  "Specialists, allied health, laboratory and pharmacy under one roof for families in Multan.": "ملتان کے خاندانوں کے لیے ماہر ڈاکٹرز، الائیڈ ہیلتھ، لیبارٹری اور فارمیسی ایک ہی چھت تلے۔",
  "Verify a Document": "دستاویز کی تصدیق",
  "Services": "سروسز",
  "Ali Medical Complex is a healthcare facility at Chungi No. 1, Suraj Miani Road, Multan. We bring together specialists in eye care, ENT, cardiology, gynecology, dermatology, pediatrics and dentistry so that families can get expert care in one place.": "علی میڈیکل کمپلیکس چونگی نمبر 1، سورج میانی روڈ، ملتان پر واقع ایک طبی مرکز ہے۔ ہم آنکھ، کان ناک گلا، دل، زنانہ امراض، جلد، بچوں اور دانتوں کے ماہرین کو ایک جگہ اکٹھا کرتے ہیں تاکہ خاندانوں کو ایک ہی جگہ ماہرانہ علاج مل سکے۔",
  "Our doctors are supported by an allied health team (physiotherapy, nutrition, occupational therapy and psychology), a nursing team, an in-house laboratory under a pathologist, and a pharmacy run by a Pharm-D pharmacist. The hospital is led by our Director, with a Primary Health Organisation Manager overseeing day-to-day services.": "ہمارے ڈاکٹروں کے ساتھ الائیڈ ہیلتھ ٹیم (فزیوتھراپی، غذائیت، آکیوپیشنل تھراپی اور نفسیات)، نرسنگ ٹیم، پیتھالوجسٹ کی زیرِ نگرانی لیبارٹری اور فارم ڈی فارماسسٹ کی فارمیسی موجود ہے۔ ہسپتال کی قیادت ڈائریکٹر کرتے ہیں، اور روزمرہ خدمات کی نگرانی پرائمری ہیلتھ آرگنائزیشن مینیجر کرتی ہیں۔",
  "Eye, ENT, Cardiology, Gynecology, Dermatology, Pediatrics, Dental": "آنکھ، ای این ٹی، دل، زنانہ امراض، جلد، بچے، دانت",
  "Consultations with specialists in seven fields of medicine and dentistry.": "طب اور دندان سازی کے سات شعبوں کے ماہرین سے مشورہ۔",
  "Laboratory & pharmacy": "لیبارٹری اور فارمیسی",
  "Tests under a qualified pathologist and medicines from a Pharm-D pharmacist.": "مستند پیتھالوجسٹ کے ٹیسٹ اور فارم ڈی فارماسسٹ سے دوائیں۔",
  "Therapy & counselling": "تھراپی اور کونسلنگ",
  "Physiotherapy, occupational therapy, diet counselling and psychology.": "فزیوتھراپی، آکیوپیشنل تھراپی، ڈائٹ کونسلنگ اور نفسیات۔",
  "Meet our team": "ہماری ٹیم سے ملیں",
  "See how the hospital is organised and who looks after you.": "دیکھیں ہسپتال کیسے منظم ہے اور آپ کی دیکھ بھال کون کرتا ہے۔",
  "The people who run Ali Medical Complex and care for our patients.": "وہ لوگ جو علی میڈیکل کمپلیکس چلاتے ہیں اور ہمارے مریضوں کی دیکھ بھال کرتے ہیں۔",
  "Want to see one of our specialists?": "ہمارے کسی ماہر ڈاکٹر سے ملنا چاہتے ہیں؟",
  "See timings, fees and book online.": "اوقات، فیس دیکھیں اور آن لائن بک کریں۔",
  "Eye specialist and Head of Clinical Services at Ali Medical Complex.": "آنکھوں کے ماہر اور علی میڈیکل کمپلیکس کے سربراہ کلینیکل سروسز۔",
  "Ear, nose and throat specialist.": "کان، ناک اور گلے کے ماہر۔",
  "Heart specialist.": "دل کے ماہر۔",
  "Women's health and pregnancy care.": "خواتین کی صحت اور حمل کی دیکھ بھال۔",
  "Skin, hair and nail specialist.": "جلد، بالوں اور ناخنوں کے ماہر۔",
  "Child specialist.": "بچوں کے ماہر۔",
  "Dental care for adults and children.": "بڑوں اور بچوں کے دانتوں کا علاج۔",
  "Physiotherapy and rehabilitation.": "فزیوتھراپی اور بحالی۔",
  "Diet and nutrition counselling.": "ڈائٹ اور غذائیت کی کونسلنگ۔",
  "Counselling and psychological assessment.": "کونسلنگ اور نفسیاتی جائزہ۔",
  "Blurred or weak vision": "دھندلی یا کمزور نظر",
  "Red, itchy or watery eyes": "آنکھوں کی سرخی، خارش یا پانی آنا",
  "Eye infections and allergies": "آنکھوں کا انفیکشن اور الرجی",
  "Cataract assessment": "موتیا کی جانچ",
  "Glaucoma screening": "کالا موتیا کی جانچ",
  "Diabetic eye check-ups": "شوگر کے مریضوں کی آنکھوں کا معائنہ",
  "Ear pain, discharge and wax": "کان کا درد، رطوبت اور میل",
  "Hearing problems": "سننے کے مسائل",
  "Sinusitis and nasal blockage": "سائنس اور ناک بند ہونا",
  "Tonsils and sore throat": "ٹانسلز اور گلے کی خرابی",
  "Allergic rhinitis": "ناک کی الرجی",
  "Voice and swallowing problems": "آواز اور نگلنے کے مسائل",
  "Chest pain and palpitations": "سینے کا درد اور دل کی دھڑکن",
  "Heart failure follow-up": "دل کی کمزوری کا فالو اپ",
  "Shortness of breath": "سانس پھولنا",
  "Heart check-ups before surgery": "آپریشن سے پہلے دل کا معائنہ",
  "Antenatal (pregnancy) check-ups": "حمل کے دوران معائنہ",
  "Irregular or painful periods": "بے قاعدہ یا تکلیف دہ ماہواری",
  "PCOS": "پی سی او ایس",
  "Infertility consultation": "بے اولادی کا مشورہ",
  "Family planning": "خاندانی منصوبہ بندی",
  "Menopause problems": "سن یاس کے مسائل",
  "Acne and scars": "کیل مہاسے اور نشانات",
  "Eczema and allergies": "ایگزیما اور الرجی",
  "Fungal infections": "فنگل انفیکشن",
  "Hair fall": "بال گرنا",
  "Pigmentation and melasma": "جلد کے دھبے اور چھائیاں",
  "Psoriasis": "چنبل",
  "Toothache and cavities": "دانت کا درد اور کیڑا",
  "Fillings": "فلنگ",
  "Tooth extraction": "دانت نکالنا",
  "Scaling and gum problems": "اسکیلنگ اور مسوڑھوں کے مسائل",
  "Children’s dental care": "بچوں کے دانتوں کا علاج",
  "Bad breath": "منہ کی بو",
  "Back and neck pain": "کمر اور گردن کا درد",
  "Knee and joint pain": "گھٹنے اور جوڑوں کا درد",
  "Sports injuries": "کھیل کے دوران چوٹیں",
  "Stroke rehabilitation": "فالج کے بعد بحالی",
  "Frozen shoulder": "کندھے کا جام ہونا",
  "Rehab after fractures and surgery": "فریکچر اور آپریشن کے بعد بحالی",
  "Weight loss and weight gain": "وزن کم کرنا اور بڑھانا",
  "Diet for diabetes and blood pressure": "شوگر اور بلڈ پریشر کی ڈائٹ",
  "Pregnancy and breastfeeding nutrition": "حمل اور دودھ پلانے کے دوران غذا",
  "Child nutrition": "بچوں کی غذا",
  "High cholesterol diet": "کولیسٹرول کی ڈائٹ",
  "Blood tests (CBC, sugar, cholesterol, thyroid)": "خون کے ٹیسٹ (سی بی سی، شوگر، کولیسٹرول، تھائیرائیڈ)",
  "Urine and stool tests": "پیشاب اور پاخانے کے ٹیسٹ",
  "Liver and kidney function tests": "جگر اور گردوں کے ٹیسٹ",
  "Tests ordered by our doctors": "ہمارے ڈاکٹروں کے تجویز کردہ ٹیسٹ",
  "Available at the hospital during OPD hours.": "او پی ڈی اوقات میں ہسپتال میں دستیاب۔",
  "Prescription medicines": "نسخے کی دوائیں",
  "Advice on how to take your medicines": "دوائیں استعمال کرنے کا طریقہ",
  "Medicines prescribed by our doctors": "ہمارے ڈاکٹروں کی تجویز کردہ دوائیں",
  "Each doctor’s fee is shown on their profile and when you book. You can also call us to ask.": "ہر ڈاکٹر کی فیس ان کی پروفائل اور بکنگ کے وقت دکھائی جاتی ہے۔ آپ کال کر کے بھی پوچھ سکتے ہیں۔",
  "How can I check that a salary slip or letter from the hospital is genuine?": "ہسپتال کی تنخواہ سلپ یا خط اصلی ہونے کی تصدیق کیسے کروں؟",
  "Every salary slip and letter we issue has a verification code at the bottom. Enter it on the “Verify a Document” page of this website.": "ہماری ہر تنخواہ سلپ اور خط کے نیچے تصدیقی کوڈ ہوتا ہے۔ اسے ویب سائٹ کے “دستاویز کی تصدیق” صفحے پر درج کریں۔",
  "Check that a salary slip or letter from Ali Medical Complex is genuine.": "تصدیق کریں کہ علی میڈیکل کمپلیکس کی تنخواہ سلپ یا خط اصلی ہے۔",
  "Every salary slip and letter we issue has a": "ہماری ہر تنخواہ سلپ اور خط پر صفحے کے نیچے ایک",
  "verification code": "تصدیقی کوڈ",
  "printed at the bottom of the page. Enter it below.": "درج ہوتا ہے۔ اسے نیچے لکھیں۔",
  "Verification code": "تصدیقی کوڈ",
  "Verify": "تصدیق کریں",
  "Checking…": "چیک ہو رہا ہے…",
  "If the details shown here do not match the paper document, or no record is found, the document may have been altered or was not issued by us. Please contact us on": "اگر یہاں دکھائی گئی تفصیل کاغذی دستاویز سے مختلف ہو، یا کوئی ریکارڈ نہ ملے، تو دستاویز میں ردوبدل ہو سکتا ہے یا یہ ہماری جاری کردہ نہیں۔ براہِ کرم ہم سے رابطہ کریں:",
  "No document found with this code. It may be mistyped, or the document was not issued by Ali Medical Complex.": "اس کوڈ سے کوئی دستاویز نہیں ملی۔ ہو سکتا ہے کوڈ غلط لکھا ہو، یا یہ دستاویز علی میڈیکل کمپلیکس نے جاری نہ کی ہو۔",
  "Please enter the verification code printed on the document.": "براہِ کرم دستاویز پر درج تصدیقی کوڈ لکھیں۔",
  "✓ Genuine document": "✓ اصلی دستاویز",
  "⚠ This document has been cancelled": "⚠ یہ دستاویز منسوخ کی جا چکی ہے",
  "This document was issued but later voided by the hospital. It is no longer valid.": "یہ دستاویز جاری ہوئی تھی مگر بعد میں ہسپتال نے منسوخ کر دی۔ اب یہ قابلِ قبول نہیں۔",
  "Document": "دستاویز",
  "Reference": "ریفرنس",
  "Issued for": "جس کے لیے جاری ہوئی",
  "Designation": "عہدہ",
  "Salary period": "تنخواہ کا مہینہ",
  "Gross income": "کل آمدن",
  "Net income": "خالص آمدن",
  "Issued on": "تاریخِ اجرا",
  "Compare these details with the paper document.": "یہ تفصیل کاغذی دستاویز سے ملا کر دیکھیں۔",
  "Salary slip": "تنخواہ سلپ",
  "Our Team ": "ہماری ٹیم",
  "Verify a Document ": "دستاویز کی تصدیق",
  // v8 doctor + service
  "Consultant Physician and Diabetes & Hormone Specialist (Endocrinologist). Former Senior Registrar": "کنسلٹنٹ فزیشن اور شوگر و ہارمونز کے ماہر (اینڈوکرائنالوجسٹ)۔ سابق سینئر رجسٹرار",
  "Diabetes & Hormone Specialist": "شوگر اور ہارمونز کے ماہر",
  "Diabetes & Hormones": "شوگر اور ہارمونز",
  "Assistant Professor · Consultant Physician": "اسسٹنٹ پروفیسر · کنسلٹنٹ فزیشن",
  "Consultant Physician": "کنسلٹنٹ فزیشن",
  "Consultant Physician and Diabetes & Hormone Specialist (Endocrinologist). Former Senior Registrar, Nishtar Hospital Multan.": "کنسلٹنٹ فزیشن اور شوگر و ہارمونز کے ماہر (اینڈوکرائنالوجسٹ)۔ سابق سینئر رجسٹرار، نشتر ہسپتال ملتان۔",
  "Conditions treated": "جن بیماریوں کا علاج کیا جاتا ہے",
  "Diagnosis and treatment of diabetes during pregnancy": "حمل کے دوران شوگر کی تشخیص اور علاج",
  "Complete information and treatment of diabetes and its complications": "شوگر اور اس کی پیچیدگیوں کی مکمل معلومات اور علاج",
  "Sexual health problems in women": "خواتین کے جنسی صحت کے مسائل",
  "Hormonal disorders": "ہارمونز کی خرابیاں",
  "Excessive hair growth on the face and body": "چہرے اور جسم پر زیادہ بال",
  "Diagnosis and complete treatment of male and female infertility": "مردوں اور خواتین میں بے اولادی کی تشخیص اور مکمل علاج",
  "Obesity and complications associated with it": "موٹاپا اور اس سے جڑی پیچیدگیاں",
  "Thyroid disorders": "تھائیرائیڈ کے مسائل",
  "Deficiency or excess of hormones": "ہارمونز کی کمی یا زیادتی",
  "Hormonal problems in children": "بچوں میں ہارمونز کے مسائل",
  "Hormonal problems during puberty": "بلوغت کے دوران ہارمونز کے مسائل",
  "Early or delayed puberty": "جلد یا تاخیر سے بلوغت",
  "Menstrual and reproductive hormonal problems": "ماہواری اور تولیدی ہارمونز کے مسائل",
  "Hormonal problems in men and women": "مردوں اور خواتین میں ہارمونز کے مسائل",
  "Diabetes (including in pregnancy), thyroid, hormonal disorders, infertility, obesity and puberty problems.": "شوگر (حمل کے دوران بھی)، تھائیرائیڈ، ہارمونز کی خرابیاں، بے اولادی، موٹاپا اور بلوغت کے مسائل۔",
  "Diabetes and its complications": "شوگر اور اس کی پیچیدگیاں",
  "Diabetes during pregnancy": "حمل کے دوران شوگر",
  "Male and female infertility": "مردوں اور خواتین میں بے اولادی",
  "Obesity and related problems": "موٹاپا اور متعلقہ مسائل",
  "Excessive facial and body hair": "چہرے اور جسم پر زیادہ بال",
  "Medical officer": "میڈیکل آفیسر",
  "Medical Officer": "میڈیکل آفیسر",
  // v5 design
  "Nursing Staff": "نرسنگ اسٹاف",
  "Allied health": "الائیڈ ہیلتھ",
  "Expert care for your family,": "آپ کے خاندان کے لیے ماہرانہ علاج،",
  "all under one roof": "سب ایک ہی چھت تلے",
  "Qualified specialists": "مستند ماہرین",
  "Book online 24/7": "چوبیس گھنٹے آن لائن بکنگ",
  "Lab & pharmacy on site": "لیبارٹری اور فارمیسی موجود",
  "Specialists": "ماہرین",
  "Doctors in today": "آج موجود ڈاکٹرز",
  "Team members": "ٹیم ممبرز",
  "Our services": "ہماری سروسز",
  "Learn more": "مزید جانیں",
  "Simple & quick": "آسان اور فوری",
  "How online booking works": "آن لائن بکنگ کیسے ہوتی ہے",
  "Three steps, about a minute.": "تین مراحل، تقریباً ایک منٹ۔",
  "Choose your doctor": "ڈاکٹر منتخب کریں",
  "Browse specialists, timings and fees.": "ماہرین، اوقات اور فیس دیکھیں۔",
  "Pick a free time": "خالی وقت چنیں",
  "Only open slots are shown, so no double booking.": "صرف خالی اوقات دکھائے جاتے ہیں، اس لیے دوہری بکنگ نہیں ہوتی۔",
  "Get your reference": "ریفرنس نمبر حاصل کریں",
  "Save it, add it to your calendar, and pay at the clinic.": "اسے محفوظ کریں، کیلنڈر میں شامل کریں اور فیس کلینک پر ادا کریں۔",
  "Meet the specialists": "ماہرین سے ملیں",
  "Timings are provisional. After you book, our staff will call to confirm your appointment time.": "اوقات عارضی ہیں۔ بکنگ کے بعد ہمارا اسٹاف کال کر کے آپ کے وقت کی تصدیق کرے گا۔",
  "Fee": "فیس",
  "Weekly timetable": "ہفتہ وار ٹائم ٹیبل",
  "Who is in, and when": "کون کب موجود ہے",
  "Today is highlighted. Tap a time to book.": "آج کا دن نمایاں ہے۔ بک کرنے کے لیے وقت پر ٹیپ کریں۔",
  "Why us": "ہم کیوں",
  "Doctors & therapists": "ڈاکٹرز اور تھراپسٹ",
  "OPD hours a week": "ہفتہ وار او پی ڈی گھنٹے",
  "What we stand for": "ہمارے اصول",
  "What we offer": "ہماری سہولیات",
  "Our people": "ہمارے لوگ",
  "Our team in numbers": "ہماری ٹیم اعداد و شمار میں",
  "From the hospital’s organisation chart.": "ہسپتال کے تنظیمی چارٹ سے۔",
  "Team members by department": "شعبہ وار ٹیم ممبرز",
  "Number of people in each department": "ہر شعبے میں افراد کی تعداد",
  "Show as table": "ٹیبل کی صورت میں دیکھیں",
  "Department": "شعبہ",
  "people": "افراد",
  "Weekly OPD hours by service": "سروس کے لحاظ سے ہفتہ وار او پی ڈی گھنٹے",
  "From the current clinic timetable": "موجودہ کلینک ٹائم ٹیبل سے",
  "Service": "سروس",
  "hours": "گھنٹے",
  "Specialist doctors": "اسپیشلسٹ ڈاکٹرز",
  "Nursing staff": "نرسنگ اسٹاف",
  "Hours available each day": "روزانہ دستیاب گھنٹے",
  "Our facility": "ہماری سہولت",
  "Inside the hospital": "ہسپتال کے اندر",
  "Patient reviews ": "مریضوں کی آراء",
  "Our values ": "ہماری اقدار",
  "Experience": "تجربہ",
  "Value": "قدر",
  "Item": "آئٹم",
  // page titles (part before " | ")
  'Ali Medical Complex, Multan': 'علی میڈیکل کمپلیکس، ملتان', 'Specialist Doctors & Online Appointments': 'ماہر ڈاکٹرز اور آن لائن اپائنٹمنٹ',
  'FAQs ': 'سوالات',
  'Ali Medical Complex, Multan | Specialist Doctors & Online Appointments': 'علی میڈیکل کمپلیکس، ملتان | ماہر ڈاکٹرز اور آن لائن اپائنٹمنٹ', 'Book Appointment ': 'اپائنٹمنٹ بک کریں'
};

const UR_WORDS = { Mon: 'پیر', Tue: 'منگل', Wed: 'بدھ', Thu: 'جمعرات', Fri: 'جمعہ', Sat: 'ہفتہ', Sun: 'اتوار',
  Monday: 'پیر', Tuesday: 'منگل', Wednesday: 'بدھ', Thursday: 'جمعرات', Friday: 'جمعہ', Saturday: 'ہفتہ', Sunday: 'اتوار',
  Jan: 'جنوری', Feb: 'فروری', Mar: 'مارچ', Apr: 'اپریل', May: 'مئی', Jun: 'جون', Jul: 'جولائی', Aug: 'اگست', Sep: 'ستمبر', Oct: 'اکتوبر', Nov: 'نومبر', Dec: 'دسمبر',
  AM: 'صبح', PM: 'شام' };

// Times: 12 PM–3:59 PM is "دوپہر" (afternoon); 4 PM onward "شام"; before noon "صبح"
function urTime(h, m, ap) {
  h = Number(h);
  const word = ap === 'AM' ? (h === 12 ? 'رات' : 'صبح') : (h === 12 || h < 4 ? 'دوپہر' : h < 8 ? 'شام' : 'رات');
  return `${h}:${m} ${word}`;
}
function urDates(s) {
  // only for strings made of day/month names, numbers, times and punctuation
  const words = s.match(/[A-Za-z]+/g) || [];
  if (!words.length || !words.every(w => w in UR_WORDS)) return null;
  return s.replace(/(\d{1,2}):(\d{2}) (AM|PM)/g, (_, h, m, ap) => urTime(h, m, ap))
          .replace(/[A-Za-z]+/g, w => UR_WORDS[w]).replace(/ – /g, ' تا ').replace(/,/g, '،');
}

const UR_RULES = [
  [/^(\d+) yrs$/, m => `${m[1]} سال`],
  [/^(\d+) years$/, m => `${m[1]} سال`],
  [/^Rs\. ([\d,]+)$/, m => `${m[1]} روپے`],
  [/^Rs\. ([\d,]+) – ([\d,]+)$/, m => `${m[1]} تا ${m[2]} روپے`],
  [/^\((\d+) reviews?\)$/, m => `(${m[1]} آراء)`],
  [/^· (.+)$/, m => '· ' + (UR[m[1]] || m[1])],
  [/^Available: (.+)$/, m => 'دستیاب: ' + (urDates(m[1]) || m[1])],
  [/^Call (0[\d-]+)$/, m => `کال کریں ${m[1]}`],
  [/^Booking by phone only: (.+)$/, m => `صرف فون پر بکنگ: ${m[1]}`],
  [/^Booking (AMC-\w+)$/, m => `بکنگ ${m[1]}`],
  [/^— (.+), visited$/, m => `— ${m[1]}، معائنہ:`],
  [/^On leave: (.+)$/, m => 'چھٹی پر: ' + m[1].split(', ').map(x => urDates(x) || x).join('، ')],
  [/^(.+) · Rs\. ([\d,]+)(?: · ★ ([\d.]+))?$/, m => `${UR[m[1]] || m[1]} · ${m[2]} روپے${m[3] ? ' · ★ ' + m[3] : ''}`],
  [/^Book with a (.+) specialist$/, m => 'ماہر سے بک کریں'],
  [/^See (.+) doctors$/, m => `${UR[m[1]] || m[1]} کے ڈاکٹرز دیکھیں`],
  [/^(\d+) hrs \/ week$/, m => `${m[1]} گھنٹے / ہفتہ`],
  [/^(\d+)-min visits$/, m => `${m[1]} منٹ کی ملاقات`],
  [/^(.+) \(FY (.+)\)$/, m => `${urDates(m[1]) || m[1]} (مالی سال ${m[2]})`],
  [/^© (\d{4}) Ali Medical Complex, Multan\. All rights reserved\. ·$/, m => `© ${m[1]} علی میڈیکل کمپلیکس، ملتان۔ جملہ حقوق محفوظ ہیں۔ ·`],
  [/^No times available on this date \(the doctor may be off or on leave\)\. (.+) is usually available (.+)\.$/,
    m => `اس تاریخ کو کوئی وقت دستیاب نہیں (ڈاکٹر چھٹی پر ہو سکتے ہیں)۔ ${m[1]} عام طور پر ${urDates(m[2]) || m[2]} دستیاب ہوتے ہیں۔`],
  [/^Could not load doctors\. Please call (.+?)\.?$/, m => `ڈاکٹرز لوڈ نہیں ہو سکے۔ براہِ کرم ${m[1]} پر کال کریں۔`],
  [/^(.+) – (.+) \| Ali Medical Complex, Multan$/, m => `${m[1]} – ${UR[m[2]] || m[2]} | علی میڈیکل کمپلیکس، ملتان`],
  [/^(.+) \| Ali Medical Complex(, Multan)?$/, m => `${UR[m[1]] || UR[m[1] + ' '] || m[1]} | علی میڈیکل کمپلیکس${m[2] ? '، ملتان' : ''}`],
  [/^(.+), (\d{1,2}:\d{2} [AP]M)$/, m => { const d = urDates(m[1]); return d ? `${d}، ${urDates(m[2])}` : null; }],
];

function trUr(raw) {
  const s = raw.replace(/\s+/g, ' ').trim();
  if (!s || !/[A-Za-z]/.test(s)) return null;
  if (UR[s]) return UR[s];
  // keep a leading emoji/symbol (e.g. "📍 Visit") and translate the rest
  const mm = s.match(/^([^\p{L}\p{N}←→]+)(.+)$/u);
  if (mm && UR[mm[2]]) return mm[1] + UR[mm[2]];
  for (const [re, fn] of UR_RULES) { const m = s.match(re); if (m) { const r = fn(m); if (r) return r; } }
  const d = urDates(s); if (d) return d;
  if (mm) { const d2 = urDates(mm[2]); if (d2) return mm[1] + d2; }
  return null;
}

let LANG = 'en';
try { LANG = localStorage.getItem('amc_lang') || 'en'; } catch {}

// change a text node only when the Urdu differs (prevents endless re-translation)
function trNode(n) {
  const cur = n.nodeValue, t = trUr(cur);
  if (t && t !== cur.replace(/\s+/g, ' ').trim()) n.nodeValue = (/^\s/.test(cur) ? ' ' : '') + t + (/\s$/.test(cur) ? ' ' : '');
}
function translateTree(root) {
  if (LANG !== 'ur' || !root) return;
  if (root.nodeType === 3) { if (!root.parentElement?.closest('script,style,[data-no-tr]')) trNode(root); return; }
  if (root.nodeType !== 1 || root.closest?.('script,style,[data-no-tr]')) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { if (!n.parentElement?.closest('script,style,[data-no-tr]')) trNode(n); });
  const els = root.querySelectorAll ? [root, ...root.querySelectorAll('[placeholder],[aria-label],[title]')] : [];
  els.forEach(e => ['placeholder', 'aria-label', 'title'].forEach(a => { const v = e.getAttribute?.(a); const t = v && trUr(v); if (t && t !== v) e.setAttribute(a, t); }));
}

function setLang(l) {
  try { localStorage.setItem('amc_lang', l); } catch {}
  location.reload();
}

if (LANG === 'ur') {
  document.documentElement.lang = 'ur';
  document.documentElement.dir = 'rtl';
  const f = document.createElement('link');
  f.rel = 'stylesheet';
  f.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap';
  document.head.appendChild(f);
  // translate native pop-ups too
  const oc = window.confirm.bind(window), oa = window.alert.bind(window);
  window.confirm = m => oc(trUr(String(m)) || m);
  window.alert = m => oa(trUr(String(m)) || m);
  const start = () => {
    translateTree(document.body);
    const tt = trUr(document.title); if (tt && tt !== document.title) document.title = tt;
    new MutationObserver(muts => muts.forEach(mu => {
      if (mu.type === 'characterData') translateTree(mu.target);
      mu.addedNodes.forEach(translateTree);
      if (mu.type === 'attributes') translateTree(mu.target);
    })).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
    new MutationObserver(() => { const t = trUr(document.title); if (t && t !== document.title) document.title = t; }).observe(document.querySelector('title'), { childList: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
}
