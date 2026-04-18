#include <algorithm>
#include <iostream>
#include <map>
#include <queue>
#include <string>
#include <vector>

using namespace std;

struct Node {
  int x, y, dist;
  vector<pair<int, int>> path;
};

bool isValid(int x, int y) { return (x >= 0 && x < 8 && y >= 0 && y < 8); }

string toNotation(int x, int y) {
  char file = 'a' + y;
  char rank = '8' - x;
  string s = "";
  s += file;
  s += rank;
  return s;
}

pair<int, int> fromNotation(string s) {
  int y = s[0] - 'a';
  int x = '8' - s[1];
  return {x, y};
}

void solve() {
  string startStr, endStr;
  if (!(cin >> startStr >> endStr))
    return;

  pair<int, int> start = fromNotation(startStr);
  pair<int, int> target = fromNotation(endStr);

  vector<vector<int>> vis(8, vector<int>(8, 0));
  int dx[] = {2, 1, -1, -2, -2, -1, 1, 2};
  int dy[] = {1, 2, 2, 1, -1, -2, -2, -1};

  queue<Node> q;
  vis[start.first][start.second] = 1;
  q.push({start.first, start.second, 0, {start}});

  while (!q.empty()) {
    Node node = q.front();
    q.pop();

    if (node.x == target.first && node.y == target.second) {
      cout << "{" << endl;
      cout << "  \"moves\": " << node.dist << "," << endl;
      cout << "  \"path\": [";
      for (int i = 0; i < node.path.size(); i++) {
        cout << "\"" << toNotation(node.path[i].first, node.path[i].second)
             << "\"";
        if (i < node.path.size() - 1)
          cout << ", ";
      }
      cout << "]" << endl;
      cout << "}" << endl;
      return;
    }

    for (int i = 0; i < 8; i++) {
      int nx = node.x + dx[i];
      int ny = node.y + dy[i];

      if (isValid(nx, ny) && !vis[nx][ny]) {
        vis[nx][ny] = 1;
        vector<pair<int, int>> nextPath = node.path;
        nextPath.push_back({nx, ny});
        q.push({nx, ny, node.dist + 1, nextPath});
      }
    }
  }
}

int main() {
  solve();
  return 0;
}
