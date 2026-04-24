import { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Shield,
  Camera,
  TrendingUp,
  ListChecks,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Droplets,
  Zap,
  Network,
  Eye,
  Lock,
  DollarSign,
  PieChart,
  BarChart3
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function App() {
  const [expandedQA, setExpandedQA] = useState<number | null>(null);

  const toggleQA = (index: number) => {
    setExpandedQA(expandedQA === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1673977597041-7e6512719d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="社區外觀"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30" />

        <div className="absolute top-4 left-4">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
            Monthly Report
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2 text-blue-300">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">遠東科技中心 AB 棟</span>
          </div>
          <h1 className="text-3xl mb-2">本月社區月報</h1>
          <p className="text-blue-100 text-sm mb-4">快速了解本月社區大小事</p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">115年02月</span>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              本月社區持續完成設備維護、環境整理、公共安全管理、財務彙整與智慧監控推進，並整理與住戶相關的重要事項，方便快速掌握社區營運狀況。
            </p>
            <div className="mt-3 text-xs text-blue-200">
              更新日期：2026/02/28
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Highlight Overview */}
      <div className="px-4 py-8">
        <h2 className="mb-1">本月重點總覽</h2>
        <p className="text-sm text-muted-foreground mb-6">6項主要工作成果與進度</p>

        <div className="space-y-4">
          <HighlightCard
            icon={<Wrench className="w-5 h-5" />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            title="設備維護"
            summary="本月完成多項公共設備維護與更新，包含冷卻水塔、飲水設備、升降平台與管理中心網路等項目。"
            status="已完成"
            statusColor="bg-green-100 text-green-700"
            image="https://images.unsplash.com/photo-1595856898575-9d187bd32fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
          />

          <HighlightCard
            icon={<Sparkles className="w-5 h-5" />}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            title="環境清潔"
            summary="完成園區消毒、蓄水池清洗、地磚高壓清洗與大廳玻璃清潔等環境維護工作。"
            status="已完成"
            statusColor="bg-green-100 text-green-700"
            image="https://images.unsplash.com/photo-1696592877184-ae59bf25fdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
          />

          <HighlightCard
            icon={<Shield className="w-5 h-5" />}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
            title="公共安全"
            summary="持續辦理保全勤務、事件處理、安全訓練與公共區域監控相關作業。"
            status="持續執行"
            statusColor="bg-blue-100 text-blue-700"
            image="https://images.unsplash.com/photo-1631510565971-b800a52e8847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
          />

          <HighlightCard
            icon={<Camera className="w-5 h-5" />}
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
            title="智慧監控"
            summary="本月推進園區外圍車輛動態即時查看服務，提升公共安全資訊透明度。"
            status="建置中"
            statusColor="bg-amber-100 text-amber-700"
            image="https://images.unsplash.com/photo-1672073311074-f60c4a5e7b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
          />

          <HighlightCard
            icon={<TrendingUp className="w-5 h-5" />}
            iconBg="bg-cyan-100"
            iconColor="text-cyan-600"
            title="財務概況"
            summary="本月財務資料以圖表呈現收支、管理費收繳、支出結構與可動用資金。"
            status="已彙整"
            statusColor="bg-green-100 text-green-700"
            image={null}
          />

          <HighlightCard
            icon={<ListChecks className="w-5 h-5" />}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
            title="後續追蹤"
            summary="外牆清洗、防水工程評估與監視器影像網頁建置將列為下月追蹤事項。"
            status="追蹤中"
            statusColor="bg-orange-100 text-orange-700"
            image={null}
          />
        </div>
      </div>

      {/* Monthly Maintenance Results */}
      <div className="px-4 py-8 bg-slate-50">
        <h2 className="mb-1">本月維護成果</h2>
        <p className="text-sm text-muted-foreground mb-6">設備維護、環境清潔與設施改善</p>

        {/* Equipment Maintenance */}
        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-500 rounded-full" />
            設備維護成果
          </h3>
          <div className="space-y-3">
            <MaintenanceCard
              title="A棟頂樓冷卻水塔風扇馬達更新"
              summary="A棟頂樓 6-10F 冷卻水塔 #7 風扇馬達損壞已完成更新。"
              status="已完成"
              image="https://images.unsplash.com/photo-1561400555-786780284b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="B棟冷卻水塔減速機及風葉更新"
              summary="B棟頂樓 1-5F 冷卻水塔 #3 風扇減速機及風葉已完成更新。"
              status="已完成"
              image="https://images.unsplash.com/photo-1595856898575-9d187bd32fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="飲水機清缸消毒與濾芯更換"
              summary="AB棟各樓層飲水機完成清缸消毒與濾芯更換。"
              status="已完成"
              image="https://images.unsplash.com/photo-1774271101213-51411a66cc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="A棟上下蓄水池清洗"
              summary="完成 A 棟上下蓄水池清洗工程，維護用水設備環境。"
              status="已完成"
              image="https://images.unsplash.com/photo-1774271101773-8e7cacedf12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="B1管理中心網路升級"
              summary="完成管理中心網路寬頻升級與佈線安裝。"
              status="已完成"
              image="https://images.unsplash.com/photo-1748027869634-fc2e545cfb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="A棟卸貨區升降平台維修"
              summary="卸貨區 #3 升降平台油壓軟管破損已完成更新。"
              status="已完成"
              image="https://images.unsplash.com/photo-1595856898575-9d187bd32fd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
          </div>
        </div>

        {/* Environmental Maintenance */}
        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-emerald-500 rounded-full" />
            環境維護成果
          </h3>
          <div className="space-y-3">
            <MaintenanceCard
              title="園區全區滅蚊消毒"
              summary="完成園區全區滅蚊消毒，降低公共區域蚊蟲孳生風險。"
              status="已完成"
              image="https://images.unsplash.com/photo-1696592877184-ae59bf25fdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="外圍與中庭地磚高壓清洗"
              summary="完成外圍及中庭區兩側地磚高壓清洗。"
              status="已完成"
              image="https://images.unsplash.com/photo-1696592877184-ae59bf25fdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="大廳挑高玻璃清洗"
              summary="完成 AB 棟 1 樓大廳挑高玻璃清洗及燈管更換。"
              status="已完成"
              image="https://images.unsplash.com/photo-1774271101213-51411a66cc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
          </div>
        </div>

        {/* Public Facility Improvements */}
        <div>
          <h3 className="mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
            公共設施改善
          </h3>
          <div className="space-y-3">
            <MaintenanceCard
              title="貨梯門前地板改善"
              summary="A棟 #4、#5、#6 貨梯門前地板完成加裝白鐵板工程。"
              status="已完成"
              image="https://images.unsplash.com/photo-1748027869634-fc2e545cfb0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="污廢水相關作業"
              summary="完成 B3 污廢水吊磚工程，並完成年度污廢水定期運轉申報資料。"
              status="已完成"
              image="https://images.unsplash.com/photo-1561400555-786780284b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
            />
            <MaintenanceCard
              title="水污染事件補償申請"
              summary="已辦理水污染事件水塔清洗補償申請。"
              status="已辦理"
              image={null}
            />
          </div>
        </div>
      </div>

      {/* Smart Community Highlight */}
      <div className="px-4 py-8 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="flex items-center gap-2 mb-2">
          <Camera className="w-6 h-6 text-indigo-600" />
          <h2>本月智慧社區亮點</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">園區外圍車輛動態即時查看服務推進中</p>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-indigo-100 mb-6">
          <p className="text-sm leading-relaxed text-slate-700 mb-4">
            本月社區推動園區外圍車輛動態即時查看服務，未來可透過園區官網連線查看相關影像，讓公共安全資訊更即時、更透明。
          </p>

          <div className="relative h-48 rounded-xl overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1672073311074-f60c4a5e7b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="監視器畫面"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs">
              建置中
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-4">
            <SmartFeatureCard
              icon={<Eye className="w-4 h-4" />}
              title="即時查看"
              summary="住戶未來可透過園區官網查看園區外圍車輛動態影像。"
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <SmartFeatureCard
              icon={<Shield className="w-4 h-4" />}
              title="安全透明"
              summary="將公共區域影像轉化為住戶可理解、可查閱的安全資訊。"
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <SmartFeatureCard
              icon={<Network className="w-4 h-4" />}
              title="系統串接"
              summary="後續將進行影像串接、網頁設置與官網連結。"
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatusBadge label="監視器畫面" status="建置中" color="amber" />
            <StatusBadge label="官網連線" status="規劃中" color="blue" />
            <StatusBadge label="公開範圍" status="評估中" color="slate" />
            <StatusBadge label="隱私保護" status="確認中" color="slate" />
          </div>
        </div>
      </div>

      {/* Important Decisions */}
      <div className="px-4 py-8">
        <h2 className="mb-1">本月重要決議</h2>
        <p className="text-sm text-muted-foreground mb-6">整理與住戶公共權益、社區維護及後續工程相關的重點事項</p>

        <div className="space-y-4">
          <DecisionCard
            title="AB棟外牆防水工程評估"
            status="暫緩討論"
            statusColor="bg-slate-100 text-slate-700"
            explanation="AB棟頂樓女兒牆及外牆矽利康老化防水工程，已完成初步報價比較。考量工程範圍與施作方式仍需評估，本月暫緩討論，後續將優先安排 AB棟外牆清洗工程，並視需求再提案討論。"
            nextStep="優先安排外牆清洗工程。"
            image="https://images.unsplash.com/photo-1706380469118-1e5c57701a05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
          />

          <DecisionCard
            title="園區外圍車輛動態即時查看網頁"
            status="通過執行"
            statusColor="bg-green-100 text-green-700"
            explanation="本月決議推動園區外圍車輛動態即時查看網頁，後續將由愛恩公司協助設置，並連線園區官網，提供住戶查看。"
            nextStep="進行網頁建置、影像串接與官網連結。"
            image="https://images.unsplash.com/photo-1672073311074-f60c4a5e7b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
          />
        </div>
      </div>

      {/* Resident Q&A */}
      <div className="px-4 py-8 bg-slate-50">
        <h2 className="mb-1">住戶關心 Q&A</h2>
        <p className="text-sm text-muted-foreground mb-6">整理本月住戶較關心的問題，並由管理單位提供統一回覆</p>

        <div className="space-y-3">
          <QACard
            question="外牆防水工程為什麼暫緩？"
            status="已回覆"
            shortAnswer="因工程範圍、施工方式與費用仍需進一步評估，本月先暫緩討論，並優先安排外牆清洗。"
            fullAnswer="AB棟頂樓女兒牆及外牆矽利康老化防水工程已完成初步報價比較，但因工程範圍、施工方式與費用仍需進一步評估，本月先暫緩討論。後續將優先安排 AB棟外牆清洗工程，並視實際需求再提案討論防水工程。"
            isExpanded={expandedQA === 0}
            onToggle={() => toggleQA(0)}
          />

          <QACard
            question="園區外圍車輛動態即時查看網頁是什麼？"
            status="建置中"
            shortAnswer="這是將園區外圍車輛動態影像整理成可連線查看的網頁，未來可透過園區官網查看。"
            fullAnswer="這項服務是將園區外圍車輛動態影像整理成可連線查看的網頁，未來住戶可透過園區官網查看相關畫面。目的是提升公共安全資訊透明度，讓住戶更容易掌握園區外圍車輛進出與動態狀況。"
            isExpanded={expandedQA === 1}
            onToggle={() => toggleQA(1)}
          />

          <QACard
            question="財報中的「可動用資金」和「總金額」有什麼不同？"
            status="已回覆"
            shortAnswer="總金額包含可用資金、專款基金與暫存款；可動用資金是扣除專款與暫存後，較能反映可實際調度的金額。"
            fullAnswer="總金額包含可用資金、專款基金與住戶暫存款；其中專款基金與暫存款不一定能自由調度。月報中另外列出「可動用資金餘額」，是為了讓住戶更清楚知道目前可實際用於社區日常營運與支出的資金規模。"
            isExpanded={expandedQA === 2}
            onToggle={() => toggleQA(2)}
          />

          <QACard
            question="管理費主要花在哪些地方？"
            status="已回覆"
            shortAnswer="本月主要支出集中在保全服務、大樓電費、清潔維護、垃圾清運與機電保養。"
            fullAnswer="本月主要支出集中在保全服務、大樓電費、清潔維護、垃圾清運與機電保養等項目，這些多屬於社區維持正常運作所需的固定支出。月報會以圖表方式呈現主要支出排行，方便住戶快速理解管理費用途。"
            isExpanded={expandedQA === 3}
            onToggle={() => toggleQA(3)}
          />

          <QACard
            question="智慧監控畫面會不會涉及住戶隱私？"
            status="評估中"
            shortAnswer="公開查看的影像範圍會以公共區域與車輛動態為主，並應避免涉及住戶個人隱私。"
            fullAnswer="公開查看的影像範圍會以公共區域與車輛動態為主，並應避免涉及住戶個人隱私或非必要畫面。後續建置時，管理單位會確認公開範圍、畫面角度、顯示方式與存取權限，確保服務兼顧安全與隱私。"
            isExpanded={expandedQA === 4}
            onToggle={() => toggleQA(4)}
          />
        </div>
      </div>

      {/* Financial Overview */}
      <div className="px-4 py-8">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <h2>本月財務概況</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">收支狀況、管理費收繳與資金構成摘要</p>

        {/* KPI Cards - Horizontal Scroll */}
        <div className="overflow-x-auto -mx-4 px-4 mb-6">
          <div className="flex gap-3 pb-2 min-w-max">
            <FinancialKPI title="本月收入" value="245萬" subtitle="2,450,801 元" color="bg-blue-50 border-blue-200" />
            <FinancialKPI title="本月支出" value="225萬" subtitle="2,249,016 元" color="bg-red-50 border-red-200" />
            <FinancialKPI title="本月餘絀" value="+20.2萬" subtitle="+201,785 元" color="bg-green-50 border-green-200" />
            <FinancialKPI title="本期結餘" value="1,540萬" subtitle="15,405,115 元" color="bg-indigo-50 border-indigo-200" />
            <FinancialKPI title="可動用資金" value="1,086萬" subtitle="10,863,179 元" color="bg-purple-50 border-purple-200" />
            <FinancialKPI title="管理費收繳率" value="98.41%" subtitle="未收 38,490 元" color="bg-emerald-50 border-emerald-200" />
          </div>
        </div>

        {/* Income vs Expense Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border mb-4">
          <h3 className="mb-4">本月收支對比</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { name: '收入', value: 2450801, fill: '#3b82f6' },
              { name: '支出', value: 2249016, fill: '#ef4444' },
              { name: '餘絀', value: 201785, fill: '#10b981' }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => `NT$ ${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3">
            本月收入略高於支出，整體收支維持小幅結餘。
          </p>
        </div>

        {/* Expense Structure */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border mb-4">
          <h3 className="mb-4">支出結構</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={[
                  { name: '固定支出', value: 93.73, fill: '#3b82f6' },
                  { name: '非固定支出', value: 6.27, fill: '#94a3b8' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3">
            本月支出以固定維運支出為主，包含保全、清潔、電費、機電及各項例行保養。
          </p>
        </div>

        {/* Top Expenses */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border mb-4">
          <h3 className="mb-4">主要支出排行</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: '保全服務費', value: 567500 },
                { name: '大樓電費', value: 565320 },
                { name: '清潔費', value: 500000 },
                { name: '垃圾清運', value: 110000 },
                { name: '機電保養', value: 89000 }
              ]}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip
                formatter={(value: number) => `NT$ ${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-3">
            本月主要支出集中於保全服務、電費與清潔維護，屬於社區日常營運的主要成本。
          </p>
        </div>

        {/* Fund Composition */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <h3 className="mb-4">資金構成</h3>
          <div className="space-y-3 mb-4">
            <FundBar label="可用資金" amount="10,887,254" percentage={71} color="bg-blue-500" />
            <FundBar label="頂樓修繕基金" amount="4,541,936" percentage={29} color="bg-amber-500" />
            <FundBar label="住戶暫存款" amount="24,075" percentage={0.2} color="bg-slate-400" />
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">可動用資金餘額</span>
              <span className="text-lg text-indigo-600">1,086萬</span>
            </div>
            <p className="text-xs text-muted-foreground">10,863,179 元</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            總金額中包含可用資金、專款基金與住戶暫存款；其中專款與暫存款不應視為可自由動用資金。
          </p>
        </div>
      </div>

      {/* Monthly Photo Records */}
      <div className="px-4 py-8 bg-slate-50">
        <h2 className="mb-1">本月照片紀錄</h2>
        <p className="text-sm text-muted-foreground mb-6">以照片回顧本月社區維護、清潔、工程與安全監控紀錄</p>

        <div className="space-y-6">
          <PhotoCategory
            title="設備維護"
            photos={[
              { url: "https://images.unsplash.com/photo-1561400555-786780284b67?w=400", title: "冷卻水塔維修", date: "02/15" },
              { url: "https://images.unsplash.com/photo-1774271101213-51411a66cc07?w=400", title: "飲水機消毒", date: "02/18" },
              { url: "https://images.unsplash.com/photo-1595856898575-9d187bd32fd6?w=400", title: "升降平台維修", date: "02/22" }
            ]}
          />

          <PhotoCategory
            title="環境清潔"
            photos={[
              { url: "https://images.unsplash.com/photo-1696592877184-ae59bf25fdd4?w=400", title: "園區消毒", date: "02/10" },
              { url: "https://images.unsplash.com/photo-1774271101773-8e7cacedf12b?w=400", title: "地磚清洗", date: "02/20" },
              { url: "https://images.unsplash.com/photo-1696592877184-ae59bf25fdd4?w=400", title: "玻璃清潔", date: "02/25" }
            ]}
          />

          <PhotoCategory
            title="智慧監控"
            photos={[
              { url: "https://images.unsplash.com/photo-1672073311074-f60c4a5e7b92?w=400", title: "外圍車道", date: "02/28" },
              { url: "https://images.unsplash.com/photo-1665848383782-1ea74efde68f?w=400", title: "停車場", date: "02/28" },
              { url: "https://images.unsplash.com/photo-1643123182527-3bd30840e7ed?w=400", title: "大廳監控", date: "02/28" }
            ]}
          />
        </div>
      </div>

      {/* Next Month Follow-up */}
      <div className="px-4 py-8">
        <div className="flex items-center gap-2 mb-1">
          <ListChecks className="w-6 h-6 text-orange-600" />
          <h2>下月追蹤事項</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">持續關注與後續執行項目</p>

        <div className="space-y-3">
          <FollowUpCard
            title="AB棟外牆清洗工程安排"
            status="待安排"
            statusColor="bg-amber-100 text-amber-700"
            summary="外牆防水工程本月暫緩討論，後續將優先安排 AB棟外牆清洗工程。"
          />
          <FollowUpCard
            title="外牆矽利康防水工程是否再次提案"
            status="評估中"
            statusColor="bg-slate-100 text-slate-700"
            summary="後續視實際需求及討論結果，評估是否於下次再提案討論。"
          />
          <FollowUpCard
            title="車輛動態即時查看網頁建置進度"
            status="建置中"
            statusColor="bg-blue-100 text-blue-700"
            summary="追蹤愛恩公司協助設置開放車輛動態即時查看網頁的執行進度。"
          />
          <FollowUpCard
            title="監視器影像串接與官網連線"
            status="追蹤中"
            statusColor="bg-orange-100 text-orange-700"
            summary="追蹤監視器畫面串接、官網連線、住戶瀏覽體驗及公開範圍設定。"
          />
          <FollowUpCard
            title="維護工程後續執行與費用追蹤"
            status="持續追蹤"
            statusColor="bg-blue-100 text-blue-700"
            summary="針對已完成或待執行工程，持續追蹤後續維護狀況與相關費用。"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-8 bg-slate-900 text-slate-300">
        <div className="mb-4">
          <Building2 className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-sm leading-relaxed mb-3">
            本月報由社區管理單位彙整，提供住戶快速了解本月社區營運狀況、公共設施維護成果、重要決議、財務摘要與後續追蹤事項。
          </p>
          <p className="text-xs text-slate-400 mb-2">
            資料來源：社區管理資料、維護工作報告、財務資料與本月重要決議彙整。
          </p>
          <p className="text-xs text-slate-500">
            本月報為住戶閱讀摘要，詳細正式資料仍以社區公告、財務報表及管理委員會正式文件為準。
          </p>
        </div>
        <div className="pt-4 border-t border-slate-700 text-xs text-slate-500 text-center">
          遠東科技中心 AB 棟 © 2026 • Powered by 宅管家 Home Butler
        </div>
      </div>
    </div>
  );
}

// Component: Highlight Card
function HighlightCard({
  icon,
  iconBg,
  iconColor,
  title,
  summary,
  status,
  statusColor,
  image
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  summary: string;
  status: string;
  statusColor: string;
  image: string | null;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <div className={`${iconBg} ${iconColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-sm">{title}</h4>
            <span className={`${statusColor} px-2 py-0.5 rounded-full text-xs whitespace-nowrap`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{summary}</p>
          {image && (
            <div className="relative h-32 rounded-lg overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Component: Maintenance Card
function MaintenanceCard({
  title,
  summary,
  status,
  image
}: {
  title: string;
  summary: string;
  status: string;
  image: string | null;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex gap-3">
        {image && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm leading-snug">{title}</h4>
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{summary}</p>
          <div className="mt-2">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Smart Feature Card
function SmartFeatureCard({
  icon,
  title,
  summary,
  color,
  bgColor
}: {
  icon: React.ReactNode;
  title: string;
  summary: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className={`${bgColor} ${color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}

// Component: Status Badge
function StatusBadge({ label, status, color }: { label: string; status: string; color: string }) {
  const colorMap: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    slate: 'bg-slate-50 text-slate-700 border-slate-200'
  };

  return (
    <div className={`${colorMap[color]} border rounded-lg p-2 text-center`}>
      <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
      <div className="text-xs">{status}</div>
    </div>
  );
}

// Component: Decision Card
function DecisionCard({
  title,
  status,
  statusColor,
  explanation,
  nextStep,
  image
}: {
  title: string;
  status: string;
  statusColor: string;
  explanation: string;
  nextStep: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <div className="relative h-40">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h4 className="text-white mb-2">{title}</h4>
          <span className={`${statusColor} px-3 py-1 rounded-full text-xs`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-slate-700 leading-relaxed mb-3">{explanation}</p>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="text-xs text-blue-600 mb-1">後續步驟</div>
          <div className="text-sm text-blue-900">{nextStep}</div>
        </div>
      </div>
    </div>
  );
}

// Component: Q&A Card
function QACard({
  question,
  status,
  shortAnswer,
  fullAnswer,
  isExpanded,
  onToggle
}: {
  question: string;
  status: string;
  shortAnswer: string;
  fullAnswer: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const statusColorMap: Record<string, string> = {
    '已回覆': 'bg-green-100 text-green-700',
    '建置中': 'bg-amber-100 text-amber-700',
    '評估中': 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="text-sm flex-1">{question}</h4>
          <span className={`${statusColorMap[status] || 'bg-slate-100 text-slate-700'} px-2 py-0.5 rounded-full text-xs whitespace-nowrap`}>
            {status}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{shortAnswer}</p>
        <div className="flex items-center gap-1 text-blue-600 text-xs">
          <span>{isExpanded ? '收起' : '展開完整回覆'}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="bg-slate-50 rounded-lg p-3 border">
            <p className="text-sm text-slate-700 leading-relaxed">{fullAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Component: Financial KPI
function FinancialKPI({
  title,
  value,
  subtitle,
  color
}: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className={`${color} border rounded-xl p-4 min-w-[140px]`}>
      <div className="text-xs text-muted-foreground mb-1">{title}</div>
      <div className="text-xl mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </div>
  );
}

// Component: Fund Bar
function FundBar({
  label,
  amount,
  percentage,
  color
}: {
  label: string;
  amount: string;
  percentage: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-muted-foreground">{amount}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Component: Photo Category
function PhotoCategory({
  title,
  photos
}: {
  title: string;
  photos: Array<{ url: string; title: string; date: string }>;
}) {
  return (
    <div>
      <h3 className="mb-3">{title}</h3>
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-3 pb-2">
          {photos.map((photo, idx) => (
            <div key={idx} className="flex-shrink-0 w-44">
              <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded text-xs">
                  {photo.date}
                </div>
              </div>
              <p className="text-sm">{photo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component: Follow-up Card
function FollowUpCard({
  title,
  status,
  statusColor,
  summary
}: {
  title: string;
  status: string;
  statusColor: string;
  summary: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-sm">{title}</h4>
            <span className={`${statusColor} px-2 py-0.5 rounded-full text-xs whitespace-nowrap`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  );
}