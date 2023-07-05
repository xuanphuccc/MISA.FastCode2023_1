import MISAAxios from "@/axios";

class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.baseAxios = MISAAxios;
  }

  /**
   * thực hiện lấy dữ dữ liệu
   * @author: TTANH (01/07/2023)
   */
  async get() {
    const res = await this.baseAxios.get(this.baseUrl);
    return res;
  }

  /**
   * * thực hiện thêm mới dữ liệu
   * @author: TTANH (01/07/2023)
   * @param {Object} dataAdd dữ liệu cần thêm
   */
  async post(dataAdd) {
    const res = await this.baseAxios.post(this.baseUrl, dataAdd);
    return res;
  }

  /**
   * * thực hiện cập nhật dữ liệu của bản ghi
   * @author: TTANH (01/07/2023)
   * @param {string} id id của bản ghi
   * @param {Object} dataUpdate dữ liệu cần thêm
   */
  async put(id, dataUpdate) {
    const res = await this.baseAxios.put(this.baseUrl + `/${id}`, dataUpdate);
    return res;
  }

  /**
   * xóa 1 bản ghi
   * @author: TTANH (02/07/2023)
   * @param {string} id id của bản ghi
   */
  async delete(id) {
    const res = await this.baseAxios.delete(this.baseUrl + `/${id}`);
    return res;
  }
}

export default BaseService;
