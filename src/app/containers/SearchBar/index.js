import React, { useEffect, useState } from "react";
import { DownOutlined, PlusOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Table, DatePicker } from "antd";
import moment from "moment";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import "./Search.scss";

function SearchBar(props) {
  const [statusFilter, setStatusFilter] = useState(false);
  const [form] = Form.useForm();
  const [search, setSearch] = useState({});
  const location = useLocation();
  useEffect(() => {
    let searchData = queryString.parse(location.search);
    if (searchData.from_date) {
      searchData.from_date = moment(searchData.from_date);
    }
    if (searchData.to_date) {
      searchData.to_date = moment(searchData.to_date);
    }
    if (searchData.from_date_1) {
      searchData.from_date_1 = moment(searchData.from_date_1);
    }
    if (searchData.to_date_1) {
      searchData.to_date_1 = moment(searchData.to_date_1);
    }
    setSearch(searchData);
    delete searchData.page;
    delete searchData.limit;
    if (Object.keys(searchData).length > 0) {
      setStatusFilter(true);
    }
  }, [location]);

  const handleFilter = () => {
    setStatusFilter(!statusFilter);
  };

  const handleFields = (fields) => {
    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        if (fields[key]) {
          if (["from_date", "to_date", "from_date_1", "to_date_1"].indexOf(key) >= 0) {
            fields[key] = moment(fields[key]).format("YYYY-MM-DD");
          }
        } else {
          fields[key] = undefined;
        }
      }
    }
    return fields;
  };
  const handleSubmit = () => {
    const { onFilterChange } = props;
    const values = form.getFieldsValue();
    const fields = handleFields(values);
    onFilterChange?.(fields);
  };
  const handleReset = () => {
    const { onFilterReset } = props;
    const fields = form.getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    form.setFieldsValue(fields);
    handleSubmit();
    onFilterReset?.();
  };
  const onChange = (data, value) => {
    if (data.children) {
      this.formRef.current.setFieldsValue(data.children);
    }
    if (data.onChange) {
      data.onChange(value, data.name);
    }
  };
  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;
    // Loại bỏ ký tự "(" và ")"
    const sanitizedValue = value.replace(/[()]/g, "");
    form.setFieldsValue({ [fieldName]: sanitizedValue });
  };

  const getFields = () => {
    let { dataSearch, colsize } = props;
    let children = [];
    for (let i = 0; i < dataSearch.length; i++) {
      let data = dataSearch[i];
      if (data.type === "text") {
        children.push(
          <Col xl={{ span: data.xl ? data.xl : colsize || 6 }} md={{ span: 12 }} sm={{ span: 24 }} key={i}>
            <Form.Item
              name={data.name}
              label={data.label}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Input placeholder={data.label} allowClear onChange={(event) => handleInputChange(event, data.name)} />
            </Form.Item>
          </Col>
        );
      } else if (data.type === "date") {
        children.push(
          <Col xl={{ span: data.xl ? data.xl : colsize || 6 }} md={{ span: 12 }} sm={{ span: 24 }} key={i}>
            <Form.Item
              name={data.name}
              label={data.label}
              labelCol={{
                span: 24,
              }}
              rules={data.rules ? [data.rules] : []}
              wrapperCol={{
                span: 24,
              }}
            >
              <DatePicker format="DD-MM-YYYY" locale={location} className="w-full" placeholder={data.label} />
            </Form.Item>
          </Col>
        );
      } else if (data.type === "select") {
        let { options } = data;
        children.push(
          <Col xl={{ span: data.xl ? data.xl : colsize || 6 }} md={{ span: 12 }} sm={{ span: 24 }} key={i}>
            <Form.Item
              name={data.name}
              label={data.label}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Select
                showSearch
                allowClear={true}
                placeholder={data.label}
                onChange={onChange.bind(this, data)}
                filterOption={(input, option) => {
                  if (!option.children) {
                    return null;
                  }
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {options.map((opt, idx) => {
                  if (opt.OptGroup) {
                    return (
                      <Select.OptGroup key={idx} label={opt.OptGroup}>
                        {opt.value.map((nestOpt, nestIdx) => {
                          return (
                            <Option key={`${idx}.${nestIdx}`} value={nestOpt[data.key]}>
                              {nestOpt[data.value]}
                            </Option>
                          );
                        })}
                      </Select.OptGroup>
                    );
                  }
                  return (
                    <Option key={idx} value={opt[data.key].toString()}>
                      {opt[data.value]}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );
      }
    }
    return children;
  };
  const layoutColBtn = props.layoutBtn ? props.layoutBtn : { xs: 24, md: 8, xl: props.colsize || 6, xxl: 4 };

  return (
    <>
      <div className="search-bar">
        <div className="search-bar__boxBtnFilter">
          <Button
            className="search-bar__BtnFilter"
            type="primary"
            icon={statusFilter ? <UpOutlined /> : <DownOutlined />}
            onClick={handleFilter}
          >
            Bộ lọc
          </Button>
          {props.buttonHeader && (
            <Button
              className="search-bar__BtnHeader"
              type="primary"
              icon={<PlusOutlined />}
              onClick={props.handleBtnHeader}
            >
              {props.labelButtonHeader}
            </Button>
          )}
        </div>
        {statusFilter && (
          <div className="filter">
            <Form layout="vertical" form={form} onFinish={handleSubmit} initialValues={search}>
              <Row gutter={10}>
                {getFields()}
                <Col className="gutter-row btn_col" {...layoutColBtn}>
                  <Button icon={<SearchOutlined style={{ fontSize: 14 }} />} type="primary" htmlType="submit">
                    Tìm kiếm
                  </Button>
                  <Button
                    className="btn_clearFilter"
                    style={{ backgroundColor: "#FFE9D8", borderColor: "#FFE9D8", color: "#FF5C00" }}
                    onClick={handleReset}
                  >
                    Bỏ lọc
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}
export default SearchBar;

