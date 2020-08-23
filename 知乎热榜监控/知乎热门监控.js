const $ = new importModule("Env")();
const res = await getinfo();
if (config.runsInWidget) {
  let widget = createWidget(res);
  Script.setWidget(widget);
  Script.complete();
}

function createWidget(res) {
  const obj = res;
  if (obj.fresh_text == "热榜已更新") {
    // 基本信息
    var group = obj.data;
    items = [];
    for (var i = 0; i < 6; i++) {
      var item = group[i].target.title;
      items.push(item);
    }

    const w = new ListWidget();
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")];
    bgColor.locations = [0.0, 1.0];
    w.backgroundGradient = bgColor;
    w.centerAlignContent();

    const firstLine = w.addText(`[📣]知乎热榜`);
    firstLine.textSize = 12;
    firstLine.textColor = Color.white();
    firstLine.textOpacity = 0.7;

    const top1Line = w.addText(`[第一名]${items[0]}`);
    top1Line.textSize = 12;
    top1Line.textColor = Color.white();

    const top2Line = w.addText(`[第二名]${items[1]}`);
    top2Line.textSize = 12;
    top2Line.textColor = new Color("#6ef2ae");

    const top3Line = w.addText(`[第三名]${items[2]}`);
    top3Line.textSize = 12;
    top3Line.textColor = new Color("#7dbbae");

    const top4Line = w.addText(`[第四名]${items[3]}`);
    top4Line.textSize = 12;
    top4Line.textColor = new Color("#ff9468");

    const top5Line = w.addText(`[第五名]${items[4]}`);
    top5Line.textSize = 12;
    top5Line.textColor = new Color("#ffcc66");

    const top6Line = w.addText(`[第六名]${items[5]}`);
    top6Line.textSize = 12;
    top6Line.textColor = new Color("#ffa7d3");
    return w;
  }
}

async function getinfo() {
  const url = {
    url: `https://api.zhihu.com/topstory/hot-lists/total?limit=10&reverse_order=0`
  };

  const res = await $.get(url);
  log(res);
  return res;
}
