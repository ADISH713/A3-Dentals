// A3 DENTAL LAB - Master Product & Pricing Catalog
// Extracted accurately from official A3 Dental Lab Price List

const LAB_DATA = {
  business: {
    name: "A3 DENTAL LAB",
    slogan: "ARTISTRY. ANATOMY. APEX",
    phones: ["+91 8089507733", "+91 7356576633"],
    rawPhones: ["8089507733", "7356576633"],
    email: "a3.dental7733@gmail.com",
    address: "Mannur Valavu, Kozhikode - 673328, Kerala, India",
    instagram: "@A3_DENTAL",
    instagramUrl: "https://instagram.com/A3_DENTAL",
    turnaroundGuaranteed: "Crown & Bridge in 48 hours (excluding delivery day)"
  },
  
  terms: [
    {
      num: "01",
      title: "48-Hour Rapid Delivery",
      desc: "Crown and Bridge restorations delivered within 48 hours (excluding day of pickup / delivery). Fast, punctual turnaround for clinic scheduling.",
      icon: "fa-bolt-lightning",
      tag: "Guaranteed Turnaround"
    },
    {
      num: "02",
      title: "Order Policy",
      desc: "Orders once placed and cast / sintered cannot be cancelled due to custom patient-specific CAD/CAM manufacturing.",
      icon: "fa-file-shield",
      tag: "Custom Device Policy"
    },
    {
      num: "03",
      title: "7-Day Quality Reporting Window",
      desc: "Complaints regarding manufacturing defects are entertained if reported within 7 days from the delivery date for immediate rework or adjustment.",
      icon: "fa-calendar-check",
      tag: "Defect Warranty"
    },
    {
      num: "04",
      title: "Working Model Fit Guarantee",
      desc: "Precision fit is strictly verified and guaranteed on the master working cast under stereomicroscopic magnification prior to dispatch.",
      icon: "fa-certificate",
      tag: "Marginal Seal Assurance"
    }
  ],

  categories: [
    { id: "all", name: "All Solutions", icon: "fa-layer-group" },
    { id: "zirconium", name: "Zirconium", icon: "fa-gem" },
    { id: "ceramic", name: "Ceramic (PFM)", icon: "fa-tooth" },
    { id: "metal-crown", name: "Metal Crown", icon: "fa-shield-halved" },
    { id: "clear-retainers", name: "Clear Retainers", icon: "fa-smile-beam" },
    { id: "complete-denture", name: "Complete Denture", icon: "fa-teeth" },
    { id: "rpd", name: "Removable Partial (RPD)", icon: "fa-teeth-open" },
    { id: "orthodontic", name: "Orthodontic Work", icon: "fa-wand-magic-sparkles" }
  ],

  products: [
    // ZIRCONIUM
    {
      id: "zr-basic",
      category: "zirconium",
      name: "Zirconium Basic [Monolith]",
      price: 1650,
      turnaround: "48 Hours",
      tag: "High Strength",
      badge: "Popular",
      rating: 4.9,
      description: "Full-contour monolithic multi-layered zirconia delivering 1200+ MPa flexural strength. Ideal for posterior molars, bruxism patients, and heavy masticatory zones.",
      highlights: ["1200+ MPa strength", "Zero chipping risk", "Chipping-resistant monolith", "Digital CAD/CAM milled"]
    },
    {
      id: "zr-advanced",
      category: "zirconium",
      name: "Zirconium Advanced [Facing Layering]",
      price: 1835,
      turnaround: "48 Hours",
      tag: "Aesthetic Balance",
      rating: 4.8,
      description: "Solid zirconia coping with handcrafted aesthetic buccal ceramic facing for harmonious blend with adjacent natural anterior and premolar dentition.",
      highlights: ["Buccal porcelain facing", "Rigid zirconia coping", "Lifelike cervical graduation", "High margin integrity"]
    },
    {
      id: "zr-premium",
      category: "zirconium",
      name: "Zirconium Premium [Full Layering]",
      price: 2030,
      turnaround: "48 Hours",
      tag: "Natural Vitality",
      badge: "Best Seller",
      rating: 5.0,
      description: "360° cut-back anatomical zirconia framework with master ceramist micro-layering. Replicates lifelike mamelon structure, depth, and incisal halo effects.",
      highlights: ["360° anatomical cut-back", "Handcrafted micro-layering", "Natural mamelon effects", "Individualized shade nuances"]
    },
    {
      id: "zr-prem-plus",
      category: "zirconium",
      name: "Zirconium Premium Plus [E.Max Layering]",
      price: 2280,
      turnaround: "48 Hours",
      tag: "Ultra Translucent",
      rating: 4.9,
      description: "Combines ultra-translucent high-strength zirconia with genuine IPS e.max fluorapatite glass-ceramic layering for supreme anterior aesthetic brilliance.",
      highlights: ["IPS e.max ceramic layering", "High translucency (HT/ST)", "Opalescent natural look", "Chipping resistant bond"]
    },
    {
      id: "zr-gold",
      category: "zirconium",
      name: "Zirconium Premium Gold [Ivoclar Blank + E.Max]",
      price: 2830,
      turnaround: "48 Hours",
      tag: "Apex Grade",
      badge: "Flagship",
      rating: 5.0,
      description: "Our flagship zirconia restoration utilizing certified authentic Ivoclar Vivadent zirconia blanks and full IPS e.max master porcelain layering.",
      highlights: ["Certified Ivoclar Vivadent Blank", "Full IPS e.max artistry", "Pinnacle aesthetic vitality", "Certificate of authenticity"]
    },

    // CERAMIC
    {
      id: "cer-basic",
      category: "ceramic",
      name: "Ceramic Basic (Facing)",
      price: 685,
      turnaround: "48 Hours",
      tag: "Economical PFM",
      rating: 4.7,
      description: "Conventional porcelain-fused-to-metal crown featuring buccal ceramic facing with cast alloy lingual backing for posterior strength.",
      highlights: ["Precision cast alloy", "Buccal aesthetic porcelain", "Time-tested durability", "Budget-friendly"]
    },
    {
      id: "cer-advanced",
      category: "ceramic",
      name: "Ceramic Advanced (Full Layering)",
      price: 775,
      turnaround: "48 Hours",
      tag: "Full Coverage PFM",
      rating: 4.8,
      description: "Complete 360-degree ceramic coverage over nickel-chromium / cobalt-chromium framework with balanced translucency and natural occlusal contours.",
      highlights: ["Complete 360° ceramic", "Custom occlusal anatomy", "Biocompatible alloy", "Reliable marginal seal"]
    },
    {
      id: "cer-premium",
      category: "ceramic",
      name: "Ceramic Premium (Ivoclar Layering)",
      price: 885,
      turnaround: "48 Hours",
      tag: "Ivoclar Classic",
      badge: "Popular",
      rating: 4.9,
      description: "Cast metal coping layered with genuine Ivoclar IPS Classic ceramic powder system for enhanced thermal expansion stability and vibrant shade reproduction.",
      highlights: ["Authentic Ivoclar IPS Classic", "Vibrant chroma stability", "Smooth antagonist-friendly glaze", "Optimal bond strength"]
    },
    {
      id: "cer-dmls",
      category: "ceramic",
      name: "Ceramic Premium Plus (DMLS + Ivoclar Layering)",
      price: 1220,
      turnaround: "48 Hours",
      tag: "DMLS 3D Printed",
      badge: "Doctor Choice",
      rating: 5.0,
      description: "Direct Metal Laser Sintering (DMLS) 3D printed Co-Cr coping with zero internal casting defects, topped with master Ivoclar porcelain layering.",
      highlights: ["3D Laser Sintered Coping", "Zero casting porosity", "Sub-20 micron marginal fit", "Ivoclar IPS ceramic finish"]
    },

    // METAL CROWN
    {
      id: "metal-full",
      category: "metal-crown",
      name: "Full Metal",
      price: 300,
      turnaround: "48 Hours",
      tag: "Cast Longevity",
      rating: 4.7,
      description: "Cast base metal full veneer crown offering unmatched longevity, zero fracture risk, and minimal tooth structure removal in tight posterior spaces.",
      highlights: ["Minimal tooth reduction", "Unbreakable longevity", "Anatomical occlusal grooves", "High polish surface"]
    },
    {
      id: "metal-dmls",
      category: "metal-crown",
      name: "Full Metal (DMLS)",
      price: 380,
      turnaround: "48 Hours",
      tag: "Laser Sintered",
      badge: "Precision",
      rating: 4.9,
      description: "Direct Metal Laser Sintered (DMLS) cobalt-chromium full crown manufactured via 3D additive printing for airtight marginal seating.",
      highlights: ["100% CAD/CAM DMLS technology", "Airtight marginal fit", "Biocompatible Co-Cr alloy", "No casting distortion"]
    },

    // CLEAR RETAINERS
    {
      id: "ret-1mm",
      category: "clear-retainers",
      name: "Clear Retainer 1mm",
      price: 450,
      turnaround: "48 Hours",
      tag: "Crystal Clarity",
      badge: "Popular",
      rating: 4.9,
      description: "Precision vacuum/pressure formed transparent orthodontic retainer fabricated from medical-grade dental thermo-copolyester.",
      highlights: ["Ultra-clear aesthetics", "Snug snap-on retention", "BPA-free medical polymer", "Laser smooth scalloped borders"]
    },
    {
      id: "ret-ng-15",
      category: "clear-retainers",
      name: "Night Guard 1.5mm",
      price: 500,
      turnaround: "48 Hours",
      tag: "Bruxism Defense",
      rating: 4.8,
      description: "Medium-thickness thermoformed occlusal night guard designed for patients with moderate nocturnal bruxism and tooth wear prevention.",
      highlights: ["1.5mm optimal thickness", "Comfortable patient adaptation", "Distributes clenching forces", "Polished borders"]
    },
    {
      id: "ret-ng-25",
      category: "clear-retainers",
      name: "Night Guard 2.5mm",
      price: 545,
      turnaround: "48 Hours",
      tag: "Heavy Bruxism",
      badge: "Heavy Duty",
      rating: 4.9,
      description: "Heavy-gauge 2.5mm occlusal guard engineered for severe bruxers, TMJ disorder relief, and maximum masticatory shock absorption.",
      highlights: ["2.5mm heavy-duty protection", "Severe bruxism relief", "Prevents TMJ occlusal strain", "Crack resistant"]
    },
    {
      id: "ret-single-tooth",
      category: "clear-retainers",
      name: "Clear Retainer with Single Tooth",
      price: 600,
      turnaround: "48 Hours",
      tag: "Interim Aesthetic",
      rating: 4.9,
      description: "Clear orthodontic retainer integrated with an aesthetic shade-matched acrylic pontic tooth for temporary cosmetic tooth replacement.",
      highlights: ["Integrated shade-matched tooth", "Prevents adjacent tooth drifting", "Cosmetic post-extraction solution", "Snug retention"]
    },

    // COMPLETE DENTURE
    {
      id: "cd-normal",
      category: "complete-denture",
      name: "Complete Denture (Normal)",
      price: 3098,
      turnaround: "3-4 Days",
      tag: "Classic Full Set",
      rating: 4.7,
      description: "Complete maxillary or mandibular denture processed with high-grade heat-cure polymethyl methacrylate (PMMA) acrylic and anatomical teeth.",
      highlights: ["Anatomical teeth arrangement", "Balanced occlusal scheme", "Dense heat-cured PMMA", "Custom gingival festooning"]
    },
    {
      id: "cd-high-impact",
      category: "complete-denture",
      name: "Complete Denture (High Impact)",
      price: 4100,
      turnaround: "3-4 Days",
      tag: "Fracture Resistant",
      badge: "High Durability",
      rating: 4.9,
      description: "Processed using advanced cross-linked high-impact acrylic polymers offering outstanding shock resistance against accidental drops.",
      highlights: ["High-impact polymer resin", "Drop & fracture resistant", "Lifelike mucosal shading", "Superior dimensional stability"]
    },
    {
      id: "cd-ivoclar",
      category: "complete-denture",
      name: "Complete Denture (Ivoclar)",
      price: 6000,
      turnaround: "3-4 Days",
      tag: "Premium Quality",
      badge: "Ivoclar Certified",
      rating: 5.0,
      description: "Manufactured using genuine Ivoclar Vivadent acrylic base and high-wear-resistant multi-chromatic Ivoclar prosthetic teeth.",
      highlights: ["Genuine Ivoclar materials", "High wear-resistant teeth", "Superior suction & mucosal seal", "Photorealistic smile aesthetics"]
    },
    {
      id: "cd-flexible",
      category: "complete-denture",
      name: "Flexible Complete Denture",
      price: 8100,
      turnaround: "4-5 Days",
      tag: "Thermoplastic Nylon",
      badge: "Ultra Comfort",
      rating: 5.0,
      description: "Premium monomer-free flexible thermoplastic denture offering supreme lightweight comfort, natural tissue translucency, and unbreakable retention.",
      highlights: ["100% monomer-free nylon", "Virtually unbreakable", "Featherlight mouth feel", "Hypoallergenic biocompatibility"]
    },
    {
      id: "cd-flex-rpd",
      category: "complete-denture",
      name: "Flexible RPD",
      price: 1550,
      turnaround: "3-4 Days",
      tag: "Non-Metal Aesthetic",
      badge: "Popular",
      rating: 4.9,
      description: "Flexible partial denture with tissue-blended nylon clasps, eliminating unsightly metal wires while preserving soft tissue health.",
      highlights: ["Invisible tissue-colored clasps", "No metal display", "Flexible & gum friendly", "High patient satisfaction"]
    },
    {
      id: "cd-addition",
      category: "complete-denture",
      name: "Addition Unit (Denture)",
      price: 430,
      turnaround: "24-48h",
      tag: "Repair & Unit Add",
      rating: 4.8,
      description: "Repair, rebasing addition, or extra prosthetic tooth/clasp addition to an existing denture prosthesis.",
      highlights: ["Fast 24-48h turnaround", "Seamless acrylic bond", "Matches existing shade", "Restores function"]
    },

    // REMOVABLE PARTIAL DENTURE (RPD)
    {
      id: "rpd-normal",
      category: "rpd",
      name: "RPD Normal",
      price: 353,
      turnaround: "2-3 Days",
      tag: "Heat-Cure Base",
      rating: 4.7,
      description: "Standard heat-cured acrylic removable partial denture with wrought orthodontic stainless-steel retaining clasps.",
      highlights: ["Heat-cured acrylic base", "Stainless steel retentive clasps", "Affordable tooth replacement", "Clean occlusal table"]
    },
    {
      id: "rpd-high-impact",
      category: "rpd",
      name: "RPD High Impact",
      price: 480,
      turnaround: "2-3 Days",
      tag: "Reinforced Acrylic",
      badge: "Recommended",
      rating: 4.9,
      description: "Partial denture formulated with high-impact acrylic resin designed to absorb masticatory stress and prevent mid-line fractures.",
      highlights: ["Reinforced acrylic matrix", "Enhanced fracture resistance", "Precision clasp contouring", "Long-term tissue fit"]
    },
    {
      id: "rpd-add-high",
      category: "rpd",
      name: "RPD High Impact Additional Unit",
      price: 100,
      turnaround: "24-48h",
      tag: "Per Extra Tooth",
      rating: 4.8,
      description: "Additional tooth or clasp unit added onto a High Impact removable partial denture.",
      highlights: ["Per unit pricing", "Seamless molecular bond", "Rapid clinic turnaround"]
    },
    {
      id: "rpd-cold-cure",
      category: "rpd",
      name: "Cold Cure RPD",
      price: 165,
      turnaround: "24 Hours",
      tag: "Express Provisional",
      rating: 4.6,
      description: "Self-curing auto-polymerizing acrylic temporary partial denture for rapid interim aesthetic replacement following extractions.",
      highlights: ["24-Hour express dispatch", "Instant aesthetic recovery", "Cost-effective temporary", "Includes retentive clasps"]
    },
    {
      id: "rpd-cold-add",
      category: "rpd",
      name: "Cold Cure Additional Unit",
      price: 50,
      turnaround: "24 Hours",
      tag: "Provisional Unit",
      rating: 4.6,
      description: "Supplementary single unit or tooth add-on for cold-cure provisional appliances.",
      highlights: ["Lowest cost unit add", "Fast same-day processing", "Provisional smile repair"]
    },

    // ORTHODONTIC WORK
    {
      id: "ortho-hawley",
      category: "orthodontic",
      name: "Hawleys Appliances",
      price: 335,
      turnaround: "48 Hours",
      tag: "Gold Standard Retainer",
      badge: "Classic",
      rating: 4.9,
      description: "The gold standard orthodontic retention appliance featuring labial bow, Adams clasps on first molars, and smooth palatal acrylic.",
      highlights: ["Stainless steel labial bow", "Adams retention clasps", "Custom acrylic colors", "Maintains post-treatment arch"]
    },
    {
      id: "ortho-hawley-abp",
      category: "orthodontic",
      name: "Hawleys with Anterior Bite Plane (ABP)",
      price: 435,
      turnaround: "48 Hours",
      tag: "Deep Bite Therapy",
      rating: 4.9,
      description: "Hawley appliance equipped with an anterior acrylic bite shelf to disocclude posterior teeth and correct deep overbites.",
      highlights: ["Anterior acrylic shelf", "Disoccludes posterior teeth", "Assists lower incisor intrusion", "Custom plane height"]
    },
    {
      id: "ortho-hawley-pbp",
      category: "orthodontic",
      name: "Hawleys with Posterior Bite Plane (PBP)",
      price: 435,
      turnaround: "48 Hours",
      tag: "Anterior Open Bite",
      rating: 4.8,
      description: "Hawley appliance with bilateral posterior acrylic bite blocks designed to clear anterior occlusal interferences.",
      highlights: ["Bilateral posterior blocks", "Facilitates anterior crossbite jump", "Smooth occlusal indexation", "Stable retention"]
    },
    {
      id: "ortho-hawley-2spring",
      category: "orthodontic",
      name: "Hawleys with 2 Spring",
      price: 375,
      turnaround: "48 Hours",
      tag: "Active Tooth Movement",
      rating: 4.8,
      description: "Hawley retainer equipped with two active auxiliary finger or Z-springs for labial movement of lingually positioned incisors.",
      highlights: ["Two active finger/z-springs", "Gentle continuous pressure", "Boxes protected with acrylic", "Easy doctor reactivation"]
    },
    {
      id: "ortho-hawley-soldered",
      category: "orthodontic",
      name: "Hawleys with Soldered Labial Bow",
      price: 725,
      turnaround: "48 Hours",
      tag: "Reinforced Retention",
      rating: 4.9,
      description: "Custom retainer where the labial bow is silver-soldered to the bridge of the Adams clasps for exceptional rigidity and retention.",
      highlights: ["Soldered labial-Adams junction", "Maximum arch rigidity", "Prevents wire distortion", "Heavy duty retention"]
    },
    {
      id: "ortho-space-regainer",
      category: "orthodontic",
      name: "Space Regainer",
      price: 525,
      turnaround: "48 Hours",
      tag: "Pediatric Ortho",
      rating: 4.9,
      description: "Appliance incorporating active springs or screw elements to reopen lost arch space caused by premature primary tooth loss.",
      highlights: ["Recovers drifted space", "Active helical coil or spring", "Preserves arch perimeter", "Custom banded or removable"]
    },
    {
      id: "ortho-oral-screen",
      category: "orthodontic",
      name: "Oral Screen",
      price: 425,
      turnaround: "48 Hours",
      tag: "Habit Breaking",
      rating: 4.7,
      description: "Vestibular myofunctional acrylic screen designed to intercept mouth breathing, digit sucking, and faulty tongue swallowing habits.",
      highlights: ["Intercepts mouth breathing", "Shields incisors from lip pressure", "Trains nasal breathing", "Smooth anatomical borders"]
    },
    {
      id: "ortho-expansion-screw",
      category: "orthodontic",
      name: "Expansion Screw Appliance",
      price: 550,
      turnaround: "48 Hours",
      tag: "Arch Widening",
      rating: 4.9,
      description: "Removable palatal plate featuring a precision stainless steel jackscrew mechanism for controlled lateral arch expansion.",
      highlights: ["Precision expansion jackscrew", "Split acrylic palatal plate", "Activation key included", "Controlled transverse width"]
    },
    {
      id: "ortho-exp-biteplane",
      category: "orthodontic",
      name: "Expansion with Bite Plane",
      price: 675,
      turnaround: "48 Hours",
      tag: "Dual Action Ortho",
      rating: 4.9,
      description: "Combines an active palatal expansion screw with an anterior or posterior acrylic bite platform to unlock occlusal interferences.",
      highlights: ["Dual action expansion + bite plane", "Unlocks interdigitating cusps", "Accelerates transverse response", "Sturdy retention"]
    },
    {
      id: "ortho-space-maintainer",
      category: "orthodontic",
      name: "Space Maintainer Band and Loop",
      price: 525,
      turnaround: "48 Hours",
      tag: "Fixed Preventive",
      badge: "Pediatric Standard",
      rating: 5.0,
      description: "Fixed unilateral appliance comprising an orthodontic molar band and custom-contoured stainless steel wire loop resting against adjacent tooth.",
      highlights: ["Custom contoured molar band", "Rigid soldered wire loop", "Prevents molar mesial drift", "Non-removable pediatric safety"]
    },
    {
      id: "ortho-lingual-holding",
      category: "orthodontic",
      name: "Lingual Holding Arch",
      price: 620,
      turnaround: "48 Hours",
      tag: "Mandibular Anchorage",
      rating: 4.9,
      description: "Fixed lower arch space maintainer soldered to bilateral permanent mandibular first molar bands, preserving leeway space.",
      highlights: ["Preserves E-space/leeway space", "Bilateral soldered molar bands", "Rests passively on cingula", "Sturdy 0.036\" stainless steel wire"]
    },
    {
      id: "ortho-tpa",
      category: "orthodontic",
      name: "Transpalatal Arch Soldered (TPA)",
      price: 625,
      turnaround: "48 Hours",
      tag: "Maxillary Anchorage",
      rating: 4.9,
      description: "Soldered transpalatal arch connecting maxillary first permanent molars with a central omega loop for anchorage and rotation control.",
      highlights: ["Central omega loop", "Maintains transverse molar width", "Prevents mesial tipping", "Laser/gas welded precision"]
    },
    {
      id: "ortho-tongue-guard",
      category: "orthodontic",
      name: "Fixed Tongue Guard",
      price: 515,
      turnaround: "48 Hours",
      tag: "Tongue Thrust Interceptor",
      rating: 4.8,
      description: "Fixed habit-breaking appliance featuring vertical wire cribs preventing the tongue from posturing between incisors during swallowing.",
      highlights: ["Fixed vertical wire crib", "Prevents anterior open bite", "Smooth patient-friendly wire loops", "Soldered to molar bands"]
    },
    {
      id: "ortho-tongue-buccal",
      category: "orthodontic",
      name: "Fixed Tongue Guard with Buccal Tube",
      price: 565,
      turnaround: "48 Hours",
      tag: "Comprehensive Ortho",
      rating: 4.9,
      description: "Tongue crib soldered to molar bands that feature pre-welded 0.022\" or 0.018\" buccal tubes for concurrent full arch fixed bracket mechanics.",
      highlights: ["Integrated buccal tubes", "Facilitates concurrent bracket wire", "Dual purpose habit + alignment", "Heavy duty weld"]
    },
    {
      id: "ortho-fixed-abp",
      category: "orthodontic",
      name: "Fixed Anterior Bite Plane",
      price: 625,
      turnaround: "48 Hours",
      tag: "Fixed Deep Bite",
      rating: 4.8,
      description: "Fixed appliance soldered to maxillary molar bands with an acrylic anterior bite shelf for non-compliant deep bite correction.",
      highlights: ["Compliance-free fixed design", "Quick anterior bite opening", "Allows posterior eruption", "Securely cemented"]
    },
    {
      id: "ortho-hyrax",
      category: "orthodontic",
      name: "Hyrax Bondable / RPE",
      price: 1255,
      turnaround: "3 Days",
      tag: "Rapid Palatal Expander",
      badge: "Heavy Ortho",
      rating: 5.0,
      description: "Heavy-duty Hyrax rapid palatal expander with rigid 4-arm framework for rapid skeletal midpalatal suture separation in growing patients.",
      highlights: ["Rigid Hyrax expansion screw", "True skeletal orthopedic effect", "Hygienic all-metal frame", "Bondable or banded configuration"]
    }
  ]
};
