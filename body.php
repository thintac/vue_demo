<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'>

<div id='app'>
  <div class='container bg-dark text-white p-5'>
    <h2 class='text-center border-bottom border-white pb-3 mb-5'>
      自動見積もりフォーム
    </h2>

    <form>

      <div class='form-group row'>
        <label for='' class='col-md-3 col-form-label pt-0'>
          制作したいムービー
          <span class='badge badge-danger'>必須</span>
        </label>
        <div class='col-md-9'>
          <div class='row'>

            <div class='col-md-5'>
              <div class='form-check form-check-inline'>
                <input type='radio' class='form-check-input' name='movie_type' id='type1' value='余興ムービー' v-model="movieType">
                <label for='type1' class='form-check-label'>余興ムービー</label>
              </div>
              <!-- form-check -->
            </div>
            <!-- col-md-5 -->

            <div class='col-md-5'>
              <div class='form-check form-check inline'>
                <input type='radio' class='form-check-input' name='movie_type' id='type2' value='サプライズムービー' v-model="movieType">
                <label for='type2' class='form-check-label'>サプライズムービー</label>
              </div>
              <!-- form-check form-check inline -->
            </div>
            <!-- col-md-5 -->

            <div class='col-md-5'>
              <div class='form-check form-check-inline'>
                <input type='radio' class='form-check-input' name='movie_type' id='type3' value="生い立ちムービー" v-model="movieType">
                <label for='type3' class='form-check-label'>生い立ちムービー</label>
              </div>
              <!--form-check form-check-inline-->
            </div>
            <!--col-md-5-->

            <div class='col-md-5'>
              <div class='form-check form-check-inline'>
                <input type='radio' class='form-check-input' name='movie_type' id='type4' value="オープニングムービー" v-model="movieType">
                <label for='type4' class='form-check-label'>オープニングムービー</label>
              </div>
              <!--form-check form-check-inline-->
            </div>
            <!--col-md-5-->

          </div>
          <!-- row -->
        </div>
        <!-- col-md-9 -->
      </div>
      <!-- form-group -->

      <!--挙式日-->
      <div class='form-group row'>
        <label for='wedding_date' class='col-md-3 col-form-label pt-0'>
          挙式日
          <span class='badge badge-danger'>必須</span>
        </label>
        <div class='col-md-9'>
          <input type='date' class='form-control' id='wedding_date' placeholder='日付をお選びください' v-model="wedding_date">
          <small class='form-text'>結婚式のお日にちを選択してください。</small>
        </div>
        <!-- col-md-9 -->
      </div>
      <!--挙式日-->

      <!-- dvd仕上がり予定日 -->
      <div class='form-group row'>
        <label for='delivery_date' class='col-md-3 col-form-label pt-0'>
          DVD仕上がり予定日
          <span class='badge badge-danger'>必須</span>
        </label>
        <div class='col-md-9'>
          <input type='date' class='form-control' id='delivery_date' v-bind:min="tommorow" placeholder="日付をお選びください" v-model="delivery_date">
          <small class='form-text'>
            挙式日の1週間前までにDVDが必要な場合が多いため、仕上がり予定日を挙式日の1週間前に設定しております。
          </small>
        </div>
      </div>
      <!-- dvd仕上がり予定日 -->

      <!-- 小計：基本料金 -->
      <div class='form-group row'>
        <label class='col-md-3 col-form-label pt-0'>
          基本料金(税込)
        </label>
        <div class='col-md-9'>
          <div class='input-group'>
            <input type='text' class='form-control text-right' id='sum_base' v-bind:value="taxedBasePrice | number_format" readonly>
            <div class='input-group-append'>
              <label class='input-group-text'>円</label>
            </div>
          </div>
          <!-- input-group -->
        </div>
        <!--col-md-9-->
      </div>
      <!-- 小計：基本料金 -->

      <!-- オプションメニュー -->
      <div class='form-group row'>
        <label class='col-md-3 col-form-label pt-0'>
          オプションメニュー
          <span class='badge badge-info'>任意</span>
        </label>
        <div class='col-md-9'>

          <div class='form-check- mb-3'>
            <input type='checkbox' class='form-check-input' id="opt1">
            <label for='opt1' class='form-check-label'>
              BGM手配 +5,400円
            </label>
            <small class='form-text'>
              当社で楽曲を手配させて頂く場合は、1曲あたり5,400円(税込)がかかります。
            </small>
          </div>

          <div class='form-check- mb-3'>
            <input type='checkbox' class='form-check-input' id="opt2">
            <label for='opt2' class='form-check-label'>
              撮影 +5,400円
            </label>
            <small class='form-text'>
              撮影を依頼する場合。
            </small>
          </div>

          <div class='form-check- mb-3'>
            <input type='checkbox' class='form-check-input' id="opt3">
            <label for='opt3' class='form-check-label'>
              DVD盤面印刷 +5,400円
            </label>
            <small class='form-text'>
              当社でdvdの盤面を当社でデザインをさせていただく場合。
            </small>
          </div>

          <div class='form-row mb-3 align-item-center'>
            <div class='bol-auto'>
              <label for='opt4' class='form-check-label'>
                写真スキャニング +540円
              </label>
            </div>

            <div class='col-auto'>
              <div class='input-group'>
                <input type='number' class='form-control' id="opt4" value="0" min="0" max="30">
                <div class='input-group-append'>
                  <label for='opt4' class='input-group-text'>枚</label>
                </div>
              </div>
            </div>
            <small class='form-text'>
              プリントアウトした写真のスキャニングをご希望の方は、1枚あたり540円にて承ります。
            </small>
          </div>

        </div>

      </div>
      <!-- オプションメニュー -->

      <!-- 小計：オプション料金 -->
      <div class='form-group row'>
        <label class='col-md-3 col-form-label pt-0'>
          オプション料金(税込)
        </label>
        <div class='col-md-9'>
          <div class='input-group'>
            <input type='text' class='form-control text-right' id="sum_opt" value="0" readonly>
            <div class='input-group-append'>
              <label class='input-group-text'>円</label>
            </div>
          </div>
        </div>
      </div>
      <!-- 小計：オプション料金 -->

      <!-- 合計：基本料金＋オプション料金 -->
      <div class='form-group row'>
        <label class='col-md-3 col-form-label pt-0'>合計(税込)</label>
        <div class='col-md-9'>
          <div class='input-group'>
            <input type='text' class='form-control text-right' id="sum_total" value="32,400" readonly>
            <div class='input-group-append'>
              <label class='input-group-text'>円</label>
            </div>
          </div>
        </div>
      </div>
      <!-- 合計：基本料金＋オプション料金 -->

    </form>
  </div>
  <!-- container -->
</div>
<!-- app -->

<script src='https://jp.vuejs.org/js/vue.min.js'></script>
<script src="./_js/main.js"></script>
