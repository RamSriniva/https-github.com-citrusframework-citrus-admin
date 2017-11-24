/*
 * Copyright 2006-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.consol.citrus.admin.converter.action;

import com.consol.citrus.TestAction;
import com.consol.citrus.admin.converter.AbstractObjectConverter;
import com.consol.citrus.admin.model.Property;
import com.consol.citrus.admin.model.TestActionModel;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Christoph Deppisch
 */
public abstract class AbstractTestActionConverter<S, R extends TestAction> extends AbstractObjectConverter<TestActionModel, S> implements TestActionConverter<S, R> {

    private final String actionType;

    /**
     * Default constructor using action type reference.
     * @param actionType
     */
    protected AbstractTestActionConverter(String actionType) {
        this.actionType = actionType;
    }

    @Override
    public TestActionModel convert(S model) {
        TestActionModel actionModel = new TestActionModel(getActionType(), getSourceModelClass());

        ReflectionUtils.doWithFields(getSourceModelClass(), field -> {
            Property property = property(field.getName(), getDisplayName(getFieldName(field.getName())), model, getDefaultValue(field), isRequiredField(field))
                    .options(getFieldOptions(field))
                    .optionType(getOptionType(field));

            actionModel.add(property);
        }, field -> include(model, field));

        return actionModel;
    }

    /**
     * Decides if field should be included in model conversion.
     * @param model
     * @param field
     * @return
     */
    protected boolean include(S model, Field field) {
        return true;
    }

    @Override
    protected Map<String, String> getDisplayNameMappings() {
        Map<String, String> mappings = new HashMap<>();
        mappings.put("actor", "TestActor");
        return mappings;
    }

    @Override
    public String getActionType() {
        return actionType;
    }

    @Override
    public Class<TestActionModel> getTargetModelClass() {
        return TestActionModel.class;
    }
}
